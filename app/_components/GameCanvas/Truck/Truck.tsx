import {
  ActionIcon,
  Button,
  Group,
  Loader,
  MantineProvider,
  Modal,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Html, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { IconCar, IconHome } from '@tabler/icons-react';
import useSWR from 'swr';
import * as THREE from 'three';

import { Pin } from '@/app/_components/UserInterface/Pin';
import { MODEL } from '@/app/_constants/models';

import { useRouter, usePathname } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { fetcher } from '@/app/_lib/fetcher';
import { isAxiosError } from 'axios';
import { User } from '@prisma/client';

import * as styles from './Truck.css';
import { PALETTE } from '@/app/_constants/palette';
import Link from 'next/link';
import { useUser } from '@/app/[username]/UserProvider/UserProvider';

const RANKING_COUNT = 5;
const RANK_COLORS = [PALETTE.gold, PALETTE.silver, PALETTE.bronze, 'black', 'black'];

export function Truck(props: GroupProps) {
  const { user } = useUser();

  const truckModel = useGLTF(MODEL.decoration.truck.modelUrl);
  truckModel.scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
      child.material.needsUpdate = true;
      child.castShadow = true;
    }
  });

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;

    setError(null);
    setLoading(true);

    const targetGithubLoginId = inputRef.current.value;
    if (!targetGithubLoginId || targetGithubLoginId === '') {
      setLoading(false);
      return;
    }

    if (targetGithubLoginId === pathname.replace('/', '')) {
      setError('이미 해당 농장에 있습니다.');
      setLoading(false);
      return;
    }

    try {
      await fetcher(`/api/users/${targetGithubLoginId}`);
      router.push(`/${targetGithubLoginId}`);
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.status === 404) {
          setError('Git Farm에 가입한 유저인지 확인해주세요.');
          return;
        }
      }
      setError('알 수 없는 오류가 발생했습니다.');
      return;
    } finally {
      setLoading(false);
    }
  };

  const { data: rankingData } = useSWR<{ users: User[] }>(
    `/api/users/ranking?top=${RANKING_COUNT}`,
    fetcher
  );

  return (
    <group {...props}>
      <primitive object={truckModel.scene} scale={5} />

      <Html position={[-2, 12, 0]} zIndexRange={[0, 0]} occlude>
        <Pin onClick={openModal}>
          <IconCar size={36} color="white" />
        </Pin>

        <MantineProvider>
          <Modal
            opened={modalOpened}
            onClose={() => {
              closeModal();
              setError(null);
              setLoading(false);
            }}
            title={
              <Text fz={24} fw={700}>
                다른 농장 방문
              </Text>
            }
            closeButtonProps={{
              size: 'lg',
            }}
            styles={{
              header: {
                padding: 24,
              },
              body: {
                padding: 24,
                paddingTop: 0,
              },
            }}
            centered
          >
            <form onSubmit={handleSubmit}>
              <Group justify="center" align="flex-start">
                <TextInput
                  ref={inputRef}
                  data-autofocus
                  placeholder="방문할 유저의 깃허브 아이디"
                  error={error}
                  w={260}
                  size="md"
                />
                <Button type="submit" size="md" loading={loading} color={PALETTE.wood}>
                  방문
                </Button>
              </Group>
            </form>

            <Text fz={20} fw={700} mt={24} mb={12}>
              컨트리포인트 TOP {RANKING_COUNT}
            </Text>
            <ol className={styles.ranking}>
              {rankingData ? (
                rankingData.users.map((rankedUser, index) => (
                  <li key={rankedUser.githubLoginId} className={styles.rankingItem}>
                    <Group>
                      <Text c={RANK_COLORS[index]} fz={18} fw={700}>
                        {index + 1}
                      </Text>
                      <Text>
                        {rankedUser.githubLoginId} ({rankedUser.contriPoints})
                      </Text>
                    </Group>

                    {rankedUser.githubLoginId !== user.githubLoginId && (
                      <Tooltip label="방문">
                        <ActionIcon
                          component={Link}
                          href={`/${rankedUser.githubLoginId}`}
                          bg={PALETTE.wood}
                          size="lg"
                        >
                          <IconHome />
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </li>
                ))
              ) : (
                <Loader />
              )}
            </ol>
          </Modal>
        </MantineProvider>
      </Html>
    </group>
  );
}

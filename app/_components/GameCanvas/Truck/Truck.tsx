import { Button, Group, MantineProvider, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Html, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { IconCar } from '@tabler/icons-react';

import { Pin } from '@/app/_components/UserInterface/Pin';
import { MODEL } from '@/app/_constants/models';

import { useRouter, usePathname } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { fetcher } from '@/app/_lib/fetcher';
import { isAxiosError } from 'axios';

export function Truck(props: GroupProps) {
  const truckModel = useGLTF(MODEL.decoration.truck.modelUrl);

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
    if (!targetGithubLoginId || targetGithubLoginId.length === 0) return;

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
            <Stack>
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
                  <Button type="submit" size="md" loading={loading}>
                    방문
                  </Button>
                </Group>
              </form>
            </Stack>
          </Modal>
        </MantineProvider>
      </Html>
    </group>
  );
}

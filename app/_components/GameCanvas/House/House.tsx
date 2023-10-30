import { Divider, Group, List, MantineProvider, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useUser } from '@/app/[username]/UserProvider/UserProvider';
import { Pin } from '@/app/_components/UserInterface/Pin/Pin';
import { MODEL } from '@/app/_constants/models';
import { Html, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { IconHome } from '@tabler/icons-react';
import Image from 'next/image';

export function House(props: GroupProps) {
  const { user } = useUser();
  const houseLevel = `level${user.buildingLevel}` as keyof (typeof MODEL)['house'];
  const houseModel = useGLTF(MODEL.house[houseLevel].modelUrl);

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  return (
    <group {...props}>
      <primitive object={houseModel.scene} />
      <Html position={[0, 1.5, 0]} zIndexRange={[0, 0]}>
        <Pin onClick={openModal}>
          <IconHome size={36} color="white" />
        </Pin>

        <MantineProvider>
          <Modal opened={modalOpened} onClose={closeModal} centered>
            <Stack align="center">
              <Image
                src={user.avatarUrl}
                width={128}
                height={128}
                style={{ borderRadius: '50%' }}
                alt={`${user.githubLoginId}'s avatar`}
              />
              <Stack align="center" gap={4}>
                <Text fz={24} fw={700}>
                  {user.githubLoginId}
                </Text>
                {user.email && (
                  <Text fz={16} c="gray">
                    {user.email}
                  </Text>
                )}
                <Text fz={16} c="gray">
                  팔로워: {user.followers}, 팔로잉: {user.following}
                </Text>
              </Stack>
              <Group>
                <Text>
                  <strong>{user.contriPoints}</strong> 컨트리포인트
                </Text>
                <Divider orientation="vertical" size="sm" />
                <Text>
                  건물 레벨 <strong>{user.buildingLevel}</strong>
                </Text>
              </Group>

              <List pb={24}>
                <List.Item>심은 농작물: {user.farm!.item.name}</List.Item>
                <List.Item>
                  마지막 농장 접속 일자: {user.updatedAt.toISOString().split('T')[0]}
                </List.Item>
                <List.Item>농장 시작 일자: {user.createdAt.toISOString().split('T')[0]}</List.Item>
                <List.Item>
                  깃허브 시작 일자: {user.githubCreatedAt.toISOString().split('T')[0]}
                </List.Item>
              </List>
            </Stack>
          </Modal>
        </MantineProvider>
      </Html>
    </group>
  );
}

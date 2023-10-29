import { Prisma } from '@prisma/client';

export type UserDetail = Prisma.UserGetPayload<{
  include: {
    farm: {
      include: {
        item: true;
      };
    };
    inventory: {
      include: {
        item: true;
      };
    };
  };
}>;

export type ShopItem = Prisma.ShopGetPayload<{
  include: {
    item: true;
  };
}>;

export type InventoryItem = Prisma.InventoryGetPayload<{
  include: {
    item: true;
  };
}>;

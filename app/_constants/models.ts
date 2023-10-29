export const MODEL = {
  crop: {
    grass: {
      name: '풀',
      modelUrl: '/models/crops/grass.gltf',
    },
    beet: {
      name: '비트',
      modelUrl: '/models/crops/beet.gltf',
    },
    cabbage: {
      name: '양배추',
      modelUrl: '/models/crops/cabbage.gltf',
    },
    carrot: {
      name: '당근',
      modelUrl: '/models/crops/carrot.gltf',
    },
  },
  house: {
    level1: {
      modelUrl: '/models/houses/house-1.gltf',
    },
    level2: {
      modelUrl: '/models/houses/house-2.gltf',
    },
    level3: {
      modelUrl: '/models/houses/house-3.gltf',
    },
    level4: {
      modelUrl: '/models/houses/house-4.gltf',
    },
    level5: {
      modelUrl: '/models/houses/house-5.gltf',
    },
  },
  decoration: {
    bucket: {
      modelUrl: '/models/decorations/bucket.gltf',
    },
    chair: {
      modelUrl: '/models/decorations/chair.gltf',
    },
    table: {
      modelUrl: '/models/decorations/table.gltf',
    },
    terrain: {
      modelUrl: '/models/decorations/terrain.gltf',
    },
  },
} as const;

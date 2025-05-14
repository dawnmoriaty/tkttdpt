export type CartItem = {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
  size: string;
  price: number;
  quantity: number;
  checked: boolean;
};

export const initialCartItems: CartItem[] = [
  {
    id: 1,
    imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6617edf6e72357d9447ab673_love-and-romance-thumbnail-image-flowers-x-webflow-template-p-800.jpg",
    name: "Peonies Bouquet",
    type: "",
    size: "Simple",
    price: 599000,
    quantity: 1,
    checked: true,
  },
  {
    id: 2,
    imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6617ee01fa2bee68afc4cdef_red-roses-thumbnail-image-flowers-x-webflow-template-p-800.jpg",
    name: "Red Roses Arrangement",
    type: "",
    size: "Special",
    price: 399000,
    quantity: 1,
    checked: true,
  },
  {
    id: 3,
    imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6617ee1422ec6d35fec5dc2a_sunflower-bouquet-thumbnail-image-flowers-x-webflow-template-p-800.jpg",
    name: "Sunflower Bouquet",
    type: "",
    size: "Simple",
    price: 599000,
    quantity: 1,
    checked: true,
  },
  
];
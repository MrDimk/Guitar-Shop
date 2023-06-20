import {GuitarType, Product, Products} from '../types/types';

const data = {
  "data": {
    "titles": [
      "Fender Stratocaster Electric Guitar",
      "Gibson Les Paul Standard",
      "Taylor 814ce Acoustic Guitar",
      "Martin D-28 Acoustic Guitar",
      "Cordoba 15CM Concert Ukulele",
      "Ibanez RG550 Electric Guitar",
      "Gretsch G2622 Streamliner Center Block",
      "Yamaha FG800 Acoustic Guitar",
      "Epiphone Les Paul Standard PlusTop Pro",
      "Kala KA-TEM Exotic Mahogany Tenor Ukulele"
    ],
    "descriptions": [
      "The Fender Stratocaster is a versatile electric guitar with a classic sound.",
      "The Gibson Les Paul Standard is a legendary electric guitar known for its rich tone.",
      "The Taylor 814ce is a high-end acoustic guitar with exceptional playability and tone.",
      "The Martin D-28 is a renowned acoustic guitar favored by professional musicians.",
      "The Cordoba 15CM is a concert ukulele made from quality mahogany wood.",
      "The Ibanez RG550 is a high-performance electric guitar designed for shredding.",
      "The Gretsch G2622 Streamliner Center Block is a stylish semi-hollow body guitar.",
      "The Yamaha FG800 is a popular acoustic guitar with a solid spruce top.",
      "The Epiphone Les Paul Standard PlusTop Pro is a versatile electric guitar with a classic design.",
      "The Kala KA-TEM is a tenor ukulele made from exotic mahogany wood."
    ],
    "photos": [
      "guitar1.jpg",
      "guitar2.jpg",
      "guitar3.jpg",
      "guitar4.jpg",
      "guitar5.jpg",
      "guitar6.jpg",
      "guitar7.jpg",
      "guitar8.jpg",
      "guitar9.jpg",
      "guitar10.jpg"
    ],
    "types": [
      "электро",
      "аккустика",
      "укулеле"
    ]
  }
};

export function getProducts(count: number = 0): Products {
  const products: Products = [];

  for (let i = 0; i < count; i++) {
    const product: Product = {
      id: count.toString(10),
      addedDate: new Date(),
      guitarType: data.data.types[i % data.data.types.length] as GuitarType,
      article: 'dfsadfdadf',
      stringCount: 6,
      price: 17500,
      title: data.data.titles[i],
      description: data.data.descriptions[i],
      photo: 'img/content/catalog-product-1@2x.png 2x',
    };

    // @ts-ignore
    products.push(product);
  }

  return products;
}

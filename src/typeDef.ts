export type DataType = {
    limit: number;
    products: PRODUCT[];
    skip: number;
    total: number;
};

interface PRODUCT {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

// ["Số sản phẩm", "Tên sản phẩm", "Thương hiệu", "Nội dung sản phẩm", "Giá", "Xếp hạng", "Chứng khoán"]
export const TABLEHEADER = ['상품번호', '상품명', '브랜드', '상품내용', '가격', '평점', '재고'];
export const SEARCHCONDITION = ['전체', '상품명', '브랜드', '상품내용'];

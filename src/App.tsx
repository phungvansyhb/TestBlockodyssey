import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import './App.css';
import { DataType, TABLEHEADER, SEARCHCONDITION } from './typeDef';
const UrlUtil = new URLSearchParams();

type conditionSearchType = '전체' | '상품명' | '브랜드' | '상품내용';

function App() {
    function getQueryUrlKey(key: string) {
        return UrlUtil.get(key);
    }
    const [page, setPage] = useState(parseInt(getQueryUrlKey('page') as string) || 1);
    const [searchKey, useSearchKey] = useState<string | undefined>(
        getQueryUrlKey('searchKey') || undefined
    );
    const [searchCondition, setSearchCondition] = useState<conditionSearchType>(
        (getQueryUrlKey('searchCondition') as conditionSearchType) || '전체'
    );

    function handleNavigate({
        key,
        value,
    }: {
        key: 'page' | 'searchKey' | 'searchCondition';
        value: any;
    }) {
        window.location;
    }

    const fetchData = async ({
        page,
        searchKey,
        searchCondition,
    }: {
        page?: number;
        searchKey?: string;
        searchCondition?: string;
    }): Promise<DataType> => {
        const res = await fetch('https://dummyjson.com/products?limit=10', {});
        return res.json();
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getList'],
        queryFn: () => fetchData({ page, searchKey, searchCondition }),
        onSuccess(data) {
            console.log(data);
        },
    });
    if (isLoading) return <div>Loading ...</div>;
    return (
        <div className="wrap">
            <section className="">
                <div className="block block--search">
                    <span>Search</span>
                    <select name="optionSearch" id="">
                        {SEARCHCONDITION.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <input type="text" />
                    <button className="btn--search">Search</button>
                </div>
                <br />
                <div>Total product : {data?.total}</div>
                <br />
                <table style={{ width: '100%' }} className="block">
                    <thead>
                        <tr>
                            {TABLEHEADER.map((header) => (
                                <th key={header}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.products.map((product) => (
                            <tr>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.brand}</td>
                                <td>
                                    {product.description.length > 40
                                        ? product.description.slice(0, 40) + '...'
                                        : product.description}
                                </td>
                                <td>${product.price}</td>
                                <td>{product.rating}</td>
                                {/* <td>{product.thumbnail}</td> */}
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>

                    <div className="pagination"></div>
                </table>
            </section>
        </div>
    );
}

export default App;

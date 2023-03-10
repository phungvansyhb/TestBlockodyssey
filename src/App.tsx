import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import './App.css';
import { DataType, TABLEHEADER, SEARCHCONDITION } from './typeDef';
import Pagination from './paginationCpn';
import { getQueryUrlKey, handleNavigate } from './utils';

type conditionSearchType = '전체' | '상품명' | '브랜드' | '상품내용';

function App() {
    const [page, setPage] = useState(parseInt(getQueryUrlKey('page') as string) || 1);
    const [pageSize, setPageSize] = useState(parseInt(getQueryUrlKey('pageSize') as string) || 20);
    const [searchKey, setSearchKey] = useState<string | undefined>(
        getQueryUrlKey('searchKey') || undefined
    );
    const [searchCondition, setSearchCondition] = useState<conditionSearchType>(
        (getQueryUrlKey('searchCondition') as conditionSearchType) || '전체'
    );
    const fetchData = async (): Promise<DataType> => {
        const res = await fetch(
            `https://dummyjson.com/products?limit=${pageSize}&skip=${(page - 1) * pageSize}`,
            {}
        );
        return res.json();
    };
    function handleSearch() {
        handleNavigate('searchKey', searchKey);
        handleNavigate('searchCondition', searchCondition);
        refetch();
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getList', page, pageSize],
        queryFn: () => fetchData(),
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
                    <select
                        name="optionSearch"
                        id="optionSearch"
                        onChange={(e) => {
                            setSearchCondition(e.currentTarget.value as conditionSearchType);
                        }}
                        value={searchCondition}
                    >
                        {SEARCHCONDITION.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <input
                        value={searchKey}
                        type="text"
                        onChange={(e) => {
                            setSearchKey(e.target.value);
                        }}
                    />
                    <button className="btn--search" onClick={() => handleSearch()}>
                        Search
                    </button>
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
                </table>
                {data && (
                    <div className="block--pagination">
                        <select
                            name="pageSize"
                            id="pageSize"
                            style={{ height: '20px' }}
                            defaultValue={pageSize}
                            onChange={(e) => {
                                setPageSize(parseInt(e.target.value));
                                handleNavigate('pageSize', e.target.value);
                            }}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        <Pagination
                            // className="pagination-bar"
                            currentPage={page}
                            totalCount={data!.total}
                            pageSize={pageSize}
                            onPageChange={(page: number) => {
                                setPage(page);
                                handleNavigate('page', page);
                            }}
                            siblingCount={1}
                        />
                    </div>
                )}
            </section>
        </div>
    );
}

export default App;

/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import * as React from "react";
import {useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";

function Table() {
    const [statements, setStatements] = useState([])
    const [revenueFilterValues, setRevenueFilterValues] = useState({min: 0, max: 999999999999999})
    const [incomeFilterValues, setIncomeFilterValues] = useState({min: 0, max: 999999999999999})

    const BASE_URL = `http://127.0.0.1:8000`;

    const fetchData = async () => {
		const response = await fetch(`${BASE_URL}/display_data/`);
		const APIdata = await response.json();
		setStatements(APIdata);
	};

	useEffect(() => {
		fetchData();
	}, []);

    const handleClick = async (value) => {
        const response = await fetch(`${BASE_URL}/year/${value}`);
		const APIdata = await response.json();
        setStatements(APIdata);
    }

    const handleRevenueFilterMin = async (min) => {
        setRevenueFilterValues((previousDict) => {
            if (!isNaN(parseInt(min))){
                return {min: parseInt(min), max: previousDict.max}
            }
            return {min: 0, max: previousDict.max};
        });
    }

    const handleRevenueFilterMax = async (max) => {
        setRevenueFilterValues((previousDict) => {
            if (!isNaN(parseInt(max))){
                return {min: previousDict.min, max: parseInt(max)}
            }
            return {min: previousDict.min, max: 999999999999999};
        });
    }

    useEffect(() => {
        const filterFun = async () => {
           const response = await fetch(`${BASE_URL}/filter_revenue/`, {
            method: "POST", body: JSON.stringify(revenueFilterValues)
        });
        const APIdata = await response.json();
        setStatements(APIdata); 
        }
        filterFun()
    }, [BASE_URL, revenueFilterValues])

    const handleIncomeFilterMin = async (min) => {
        setIncomeFilterValues((previousDict) => {
            if (!isNaN(parseInt(min))){
                return {min: parseInt(min), max: previousDict.max}
            }
            return {min: 0, max: previousDict.max};
        });
    }

    const handleIncomeFilterMax = async (max) => {
        setIncomeFilterValues((previousDict) => {
            if (!isNaN(parseInt(max))){
                return {min: previousDict.min, max: parseInt(max)}
            }
            return {min: previousDict.min, max: 999999999999999};
        });
    }

    useEffect(() => {
        const filterFun = async () => {
           const response = await fetch(`${BASE_URL}/filter_income/`, {
            method: "POST", body: JSON.stringify(incomeFilterValues)
        });
        const APIdata = await response.json();
        setStatements(APIdata); 
        }
        filterFun()
    }, [BASE_URL, incomeFilterValues])

    const data = React.useMemo(() => statements, [statements])
    const columns = React.useMemo(() => [
        {
            Header: "Date",
            accessor: "date",
        },
        {
            Header: "Revenue",
            accessor: "revenue",
        },
        {
            Header: "Net Income",
            accessor: "netIncome",
        },
        {
            Header: "Gross Profit",
            accessor: "grossProfit",
        },
        {
            Header: "EPS",
            accessor: "eps",
        },
        {
            Header: "Operating Income",
            accessor: "operatingIncome",
        }
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

	return (
        <><div class="bg-neutral-50 px-6 pt-6 pb-2 rounded-xl shadow-lg">
                <div class="font-sans-serif ">
                <h1 class="text-4xl">Apple Inc.</h1>
                <p class="italic">AAPL (United States: NASDAQ) </p>
                <p>Annual Income Statements</p>
                <span class="space-x-5 flex justify-center">
                    <button type="button" value="4" onClick={(e) => handleClick(e.target.value)} class="border-2 border-black rounded-full hover:bg-slate-300 p-1"> 2020 </button>
                    <button type="button" value="3" onClick={(e) => handleClick(e.target.value)}  class="border-2 border-black rounded-full hover:bg-slate-300 p-1"> 2021 </button>
                    <button type="button" value="2" onClick={(e) => handleClick(e.target.value)}  class="border-2 border-black rounded-full hover:bg-slate-300 p-1"> 2022 </button>
                    <button type="button" value="1" onClick={(e) => handleClick(e.target.value)}  class="border-2 border-black rounded-full hover:bg-slate-300 p-1"> 2023 </button>
                    <button type="button" value="0" onClick={(e) => handleClick(e.target.value)}  class="border-2 border-black rounded-full hover:bg-slate-300 p-1"> 2024 </button>
                </span>
            </div>
            <div>
                <div class="">
                        <p>Filter by Revenue</p>
                        <div class="flex">
                        <input
                            class="w-13 h-5 rounded border border-black"
                            size="15"
                            type="text"
                            placeholder="Min"
                            onChange={(e) => handleRevenueFilterMin(e.target.value)}
                        /> 
                        <p class="">-</p>
                        <input
                            class="w-13 h-5 rounded border border-black"
                            size="15"
                            type="text"
                            placeholder="Max"
                            onChange={(e) => handleRevenueFilterMax(e.target.value)}
                        /> 
                    </div>
                     <p>Filter by Net Income</p>
                    <div class="flex">
                        <input
                            class="w-13 h-5 rounded border border-black"
                            size="15"
                            type="text"
                            placeholder="Min"
                            onChange={(e) => handleIncomeFilterMin(e.target.value)}
                        /> 
                       <p class="">-</p>
                        <input
                            class="w-13 h-5 rounded border border-black"
                            size="15"
                            type="text"
                            placeholder="Max"
                            onChange={(e) => handleIncomeFilterMax(e.target.value)}
                        /> 
                    </div>
                </div>
                    <table class=" mx-auto my-3 text-left text-slate-800 border-2 border-black bg-white table" {...getTableProps()}>
                        <thead class="text-s border">
                            {headerGroups.map((headerGroup) => (
                                <tr class="text-slate-500 " {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th class="flex-row justify-around items-center hover:bg-slate-200" {...column.getHeaderProps(column.getSortByToggleProps)}>

                                            {column.render("Header")}
                                            <span>
                                                {column.isSorted ? (column.isSorted ? ">" : "<") : ""}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr class="hover:bg-slate-200" {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td class="px-2" {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <a href="/"><p class="my-2 italic text-xs uppercase hover:underline"> Refresh to restart </p></a>
                </div>
        </div></>
	);
}

export default Table;
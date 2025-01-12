/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import * as React from "react";
import {useState, useEffect } from "react";
import { useTable } from "react-table";

function Table() {
    const [statements, setStatements] = useState([])

    const fetchData = async () => {
		const response = await fetch("http://127.0.0.1:8000/display_data/");
		const APIdata = await response.json();
		setStatements(APIdata);
	};

	useEffect(() => {
		fetchData();
	}, []);

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

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

	return (
		<div class="relative overflow-x-auto w-full h-full">
            <input type="text" class="block pt-2 ps-3 text-sm border rounded-lg w-80 bg-gray-50 flex items-center" placeholder="Search for items"></input>
            <table class=" text-left text-slate-800 border-2 rounded-full" {...getTableProps()}>
                <thead class="text-s  border">
                    {headerGroups.map((headerGroup) => (
                        <tr class="text-slate-500" {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th class="flex-row justify-around items-center"{...column.getHeaderProps()}>
                                    
                                    {column.render("Header")}
                                    <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg></a>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr  class="hover:bg-slate-200" {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td class ="px-2" {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
	);
}

export default Table;
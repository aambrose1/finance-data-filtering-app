/* eslint-disable react/jsx-key */
import * as React from "react";
import {useState, useEffect, useMemo} from "react";
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
		<div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>
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
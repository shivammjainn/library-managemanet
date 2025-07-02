

type DataTableProps = {
    title?: string;
    columns: string[];
    data: any[];
    isAdmin: boolean;
    lastcolumnName?: string;
    lastColumn?: (row: any) => React.ReactNode;

}

export default function DataTable({
    title,
    columns,
    data,
    isAdmin,
    lastColumn,
    lastcolumnName
}: DataTableProps
) {
    return (
        <div className="p-6">
            {title && <h2 className="text-3xl font-semibold text-gray-800 mb-6">{title}</h2>}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm border">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-6 py-3 text-left ">{col}</th>
                            ))}
                            <th className="px-6 py-3 text-start ">{lastcolumnName}</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light ">
                        {data.map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-gray-400 hover:text-white h-14 font-light">
                                {columns.map((col, colIdx) => {
                                    const key = col.toLowerCase().replace(/\s+/g, "_");
                                    return (
                                        <td key={colIdx} className=" px-6 py-2">
                                            {String(row[key])}
                                        </td>
                                    );
                                })}
                                <td className="px-4 py-2 text-start">{lastColumn?.(row)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
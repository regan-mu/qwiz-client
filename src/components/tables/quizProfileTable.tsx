import { useMemo } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import { format } from "date-fns";
import { QuizResponse, User } from "../../types";
import formatDate from "../../utils/formatDate";

const QuizProfileTable: React.FC<{ data: QuizResponse[] }> = ({ data }) => {
  const columns = useMemo<MRT_ColumnDef<QuizResponse>[]>(
    () => [
      { accessorKey: "user", header: "Name", Cell: ({cell}) => cell.getValue<User>().username },
      {
        accessorKey: "date",
        header: "Date",
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
      },
      { accessorKey: "score", header: "Score" },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
  });
  return <MaterialReactTable table={table} />;
};

export default QuizProfileTable;

import { type User, columns } from "./columns";
import { DataTable } from "./data-table";

function getData(): Array<User> {
  return [
    {
      id: "728ed52f",
      email: "cheerio@example.com",
      image: "https://example.com/m.png",
      name: "Cheerio",
      role: "SO",
      mobile: "1234567890",
    },
    // ...
  ];
}

export default function UserSettingsTable(): JSX.Element | null {
  const data = getData();
  return (
    <div className="py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

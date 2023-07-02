import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAtom } from "jotai";
import { answerAtom } from "@/jotai/answers";

function Q1() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Corporate Identity Number (CIN) of the Listed Entity</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.cin ?? ""}
          onChange={(e) => setAnswer({ ...answer, cin: e.target.value })}
          type="text"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q2() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Name of the Listed Entity</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.name ?? ""}
          onChange={(e) => setAnswer({ ...answer, name: e.target.value })}
          type="text"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q3() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Year of Incorporation</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.yearOfIncorporation ?? ""}
          onChange={(e) =>
            setAnswer({
              ...answer,
              yearOfIncorporation: e.target.valueAsNumber,
            })
          }
          type="number"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q4() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Registered Office Address</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.registeredOfficeAddress ?? ""}
          onChange={(e) =>
            setAnswer({
              ...answer,
              registeredOfficeAddress: e.target.value,
            })
          }
          type="text"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q5() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Corporate Office Address</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.corporateAddress ?? ""}
          onChange={(e) =>
            setAnswer({
              ...answer,
              corporateAddress: e.target.value,
            })
          }
          type="text"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q6() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Email</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.email ?? ""}
          onChange={(e) =>
            setAnswer({
              ...answer,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q7() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Telephone</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.telephone ?? ""}
          onChange={(e) =>
            setAnswer({
              ...answer,
              telephone: e.target.value,
            })
          }
          type="number"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q8() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Website</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.website ?? ""}
          onChange={(e) =>
            setAnswer({
              ...answer,
              website: e.target.value,
            })
          }
          type="text"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q9() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Financial year for which reporting is being done</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.financialYear ?? ""}
          onChange={(e) =>
            setAnswer({
              ...answer,
              financialYear: e.target.value,
            })
          }
          type="number"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q10() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Name of the Stock Exchange(s) where shares are listed</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.stockExchanges ?? ""}
          onChange={(e) =>
            setAnswer({
              ...answer,
              stockExchanges: e.target.value,
            })
          }
          type="text"
          placeholder="NSE, BSE"
        />
      </div>
    </div>
  );
}

function Q11() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>Paid-up Capital</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.paidUpCapital ?? ""}
          onChange={(e) =>
            setAnswer({
              ...answer,
              paidUpCapital: e.target.value,
            })
          }
          type="text"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q12() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <div className="flex w-full max-w-sm flex-col items-center">
        <div className="my-4 flex flex-col gap-y-2">
          <Label>
            Email of the person who may be contacted in case of any queries on
            the BRSR report
          </Label>
          <Input
            value={answer?.contactPerson ?? ""}
            onChange={(e) => {
              setAnswer({
                ...answer,
                contactPerson: e.target.value,
              });
            }}
            type="text"
            placeholder="Please Input your answer here"
          />
        </div>
        <Button className="w-full">Save</Button>
      </div>
    </div>
  );
}

function Q13() {
  const [answer, setAnswer] = useAtom(answerAtom);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>
        Reporting boundary - Are the disclosures under this report made on a
        standalone basis (i.e. only for the entity) or on a consolidated basis
        (i.e. for the entity and all the entities which form a part of its
        consolidated financial statements, taken together).
      </Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={answer?.reportingBoundaryText ?? ""}
          onChange={(e) =>
            setAnswer({
              ...answer,
              reportingBoundaryText: e.target.value,
            })
          }
          type="text"
          placeholder="Please Input your answer here"
        />
      </div>
    </div>
  );
}

function Q14() {
  const headers = [
    "S. No.",
    "Description of Main Activity",
    "Description of Business Activity",
    "% of Turnover of the entity",
  ];
  const answerJson = {
    "1": {
      descriptionOfMainActivity: "",
      descriptionOfBusinessActivity: "",
      percentageOfTurnover: "",
    },
    "2": {
      descriptionOfMainActivity: "",
      descriptionOfBusinessActivity: "",
      percentageOfTurnover: "",
    },
  };
  const [answer, setAnswer] = React.useState(answerJson);
  const [answers, setAnswers] = useAtom(answerAtom);

  const handleAnswerChange = (key: string, value: string) => {
    setAnswer({
      ...answer,
      [key]: value,
    });
    setAnswers({
      ...answers,
      detailsOfBusinessActivities: answer,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <Label>
        Details of business activities (accounting for 90% of the turnover):
      </Label>
      <div className="flex w-full max-w-sm flex-col items-center space-x-2">
        <table className="table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} className="border border-gray-500">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-500">1</td>
              <td className="border border-gray-500">
                <Input
                  value={answer["1"].descriptionOfMainActivity}
                  onChange={(e) => handleAnswerChange("1", e.target.value)}
                  type="text"
                  placeholder="Please Input your answer here"
                />
              </td>
              <td className="border border-gray-500">
                <Input
                  value={answer["1"].descriptionOfBusinessActivity}
                  onChange={(e) => handleAnswerChange("1", e.target.value)}
                  type="text"
                  placeholder="Please Input your answer here"
                />
              </td>
              <td className="border border-gray-500">
                <Input
                  value={answer["1"].percentageOfTurnover}
                  onChange={(e) => handleAnswerChange("1", e.target.value)}
                  type="text"
                  placeholder="Please Input your answer here"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-500">2</td>
              <td className="border border-gray-500">
                <Input
                  value={answer["2"].descriptionOfMainActivity}
                  onChange={(e) => handleAnswerChange("2", e.target.value)}
                  type="text"
                  placeholder="Please Input your answer here"
                />
              </td>
              <td className="border border-gray-500">
                <Input
                  value={answer["2"].descriptionOfBusinessActivity}
                  onChange={(e) => handleAnswerChange("2", e.target.value)}
                  type="text"
                  placeholder="Please Input your answer here"
                />
              </td>
              <td className="border border-gray-500">
                <Input
                  value={answer["2"].percentageOfTurnover}
                  onChange={(e) => handleAnswerChange("2", e.target.value)}
                  type="text"
                  placeholder="Please Input your answer here"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function GeneralTable({ id }: { id: number }) {
  switch (id) {
    case 1:
      return <Q1 />;
    case 2:
      return <Q2 />;
    case 3:
      return <Q3 />;
    case 4:
      return <Q4 />;
    case 5:
      return <Q5 />;
    case 6:
      return <Q6 />;
    case 7:
      return <Q7 />;
    case 8:
      return <Q8 />;
    case 9:
      return <Q9 />;
    case 10:
      return <Q10 />;
    case 11:
      return <Q11 />;
    case 12:
      return <Q12 />;
    case 13:
      return <Q13 />;
    case 14:
      return <Q14 />;
    default:
      return <div>Not Found</div>;
  }
}

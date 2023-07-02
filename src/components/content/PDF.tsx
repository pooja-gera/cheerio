import { answerAtom } from "@/jotai/answers";
import { Table } from "@propra/react-pdf-table";
import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useAtomValue } from "jotai";
import { useSession } from "next-auth/react";

const styles = StyleSheet.create({
  body: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: 700,
    color: "darkblue",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 12,
    textDecoration: "underline",
    marginBottom: 14,
    color: "orange",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  question: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: "left",
    color: "#525252",
  },
  answer: {
    fontSize: 10,
    marginBottom: 10,
    textAlign: "left",
    color: "#0c0a09",
  },
});

const BR = () => <Text>{"\n"}</Text>;

const PDFfile = () => {
  const { data: session, status } = useSession();
  const answers = useAtomValue(answerAtom);
  if (status === "loading") return null;
  if (status === "unauthenticated") return <div>{status}</div>;
  return (
    <PDFViewer
      style={{
        width: "100%",
        height: "100%",
        minHeight: "800px",
      }}
    >
      <Document title="My Document">
        <Page size="A4" style={styles.body} wrap>
          <Text style={styles.title}>
            BUSINESS RESPONSIBILITY & SUSTAINABILITY REPORTING FORMAT
          </Text>
          <Text style={styles.author}>
            Created By: {session?.user.name ?? "Cheerio"}
          </Text>
          <Text style={styles.subtitle}>SECTION A: GENERAL DISCLOSURES</Text>
          <View>
            <Text style={styles.question}>
              1. Corporate Identity Number (CIN) of the Listed Entity
            </Text>
            <Text style={styles.answer}>{answers?.cin}</Text>
          </View>
          <View>
            <Text style={styles.question}>2. Name of the Listed Entity</Text>
            <Text style={styles.answer}>{answers?.name}</Text>
          </View>
          <View>
            <Text style={styles.question}>3. Year of incorporation</Text>
            <Text style={styles.answer}>{answers?.yearOfIncorporation}</Text>
          </View>
          <View>
            <Text style={styles.question}>4. Registered office address</Text>
            <Text style={styles.answer}>
              {answers?.registeredOfficeAddress}
            </Text>
          </View>
          <View>
            <Text style={styles.question}>5. Corporate address</Text>
            <Text style={styles.answer}>{answers?.corporateAddress}</Text>
          </View>
          <View>
            <Text style={styles.question}>6. E-mail</Text>
            <Text style={styles.answer}>{answers?.email}</Text>
          </View>
          <View>
            <Text style={styles.question}>7. Telephone</Text>
            <Text style={styles.answer}>{answers?.telephone}</Text>
          </View>
          <View>
            <Text style={styles.question}>8. Website</Text>
            <Text style={styles.answer}>{answers?.website}</Text>
          </View>
          <View>
            <Text style={styles.question}>
              9. Financial year for which reporting is being done
            </Text>
            <Text style={styles.answer}>{answers?.financialYear}</Text>
          </View>
          <View>
            <Text style={styles.question}>
              10. Name of the Stock Exchange(s) where shares are listed
            </Text>
            <Text style={styles.answer}>{answers?.stockExchanges}</Text>
          </View>
          <View>
            <Text style={styles.question}>11. Paid-up Capital</Text>
            <Text style={styles.answer}>{answers?.paidUpCapital}</Text>
          </View>
          <View>
            <Text style={styles.question}>
              12. Name and contact details (telephone, email address) of the
              person who may be contacted in case of any queries on the BRSR
              report
            </Text>
            <Text style={styles.answer}>{answers?.contactPerson}</Text>
          </View>
          <View>
            <Text style={styles.question}>
              13. Reporting boundary - Are the disclosures under this report
              made on a standalone basis (i.e. only for the entity) or on a
              consolidated basis (i.e. for the entity and all the entities which
              form a part of its consolidated financial statements, taken
              together)
            </Text>
            <Text style={styles.answer}>{answers?.reportingBoundaryText}</Text>
          </View>
          <View>
            <Text style={styles.question}>
              14. Details of business activities (accounting for 90% of the
              turnover):
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFfile;

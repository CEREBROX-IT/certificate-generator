import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAwardee } from "../../redux/slice/awardee/getAwardee";
import { getSession } from "../../redux/slice/session/getSession";
import { getUserDatafromToken } from "../../utils/extractJWT";
import SplashScreen from "../../screens/SplashScreen";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";

const WMAATemplate = () => {
  const dispatch = useDispatch();
  const userData = getUserDatafromToken();
  const userID = userData ? userData.decodedToken.userId : 0;
  const awardeeList = useSelector((state) => state.getAwardee?.data?.awardees);
  const SessionData = useSelector((state) => state.getSession?.data?.session);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    dispatch(getAwardee(userID));
    dispatch(getSession(userID));
  }, [dispatch]);

  const getOrdinalSuffix = (number) => {
    if (number === 1 || number === 21 || number === 31) {
      return "st";
    } else if (number === 2 || number === 22) {
      return "nd";
    } else if (number === 3 || number === 23) {
      return "rd";
    } else {
      return "th";
    }
  };

  useEffect(() => {
    if (!SessionData || !SessionData.dateToPresent) {
      return;
    }

    const dateToPresent = new Date(SessionData.dateToPresent);
    const day = dateToPresent.getDate();
    const formattedDate = `${day}${getOrdinalSuffix(
      day
    )} day of ${dateToPresent.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })}`;
    setFormattedDate(formattedDate);
  }, [SessionData]);

  const generateCertificate = () => {
    if (!SessionData || !awardeeList) {
      return null;
    }

    const pages = [];

    // Iterate until the second to last awardee
    for (let index = 0; index < awardeeList.length - 1; index += 2) {
      const awardee = awardeeList[index];
      const nextPageAwardee = awardeeList[index + 1];

      const pageContent = (
        <Page
          key={index / 2}
          size="letter"
          orientation="portrait"
          style={{ paddingTop: 10 }}
        >
          <View style={{ flexDirection: "column" }}>
            <View style={{ marginBottom: 20 }}>
              {renderCertificate(awardee)}
            </View>
            <View style={{ marginBottom: 20 }}>
              {renderCertificate(nextPageAwardee)}
            </View>
          </View>
        </Page>
      );

      pages.push(pageContent);
    }

    // Check if there's a last awardee left
    if (awardeeList.length % 2 !== 0) {
      const lastAwardee = awardeeList[awardeeList.length - 1];
      const lastPageContent = (
        <Page
          key={(awardeeList.length - 1) / 2}
          size="letter"
          orientation="portrait"
          style={{ paddingTop: 20 }}
        >
          <View style={{ flexDirection: "column" }}>
            <View>{renderCertificate(lastAwardee)}</View>
          </View>
        </Page>
      );
      pages.push(lastPageContent);
    }

    return <Document>{pages}</Document>;
  };

  const renderCertificate = (awardee) => {
    return (
      <View
        style={{
          position: "relative",
          paddingLeft: "15px",
          paddingRight: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={SessionData.certificateTemplate}
          style={{
            width: "100%",
            height: "370px",
          }}
        />
        <View
          style={{
            position: "absolute",
            width: "100%",
            paddingLeft: "40px",
          }}
        >
          {SessionData.quarter === "1st Grading" ? (
            <>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Helvetica-Bold",
                  marginLeft: "130px",
                  marginRight: "10px",
                  marginTop: "90px",
                  fontSize: 18,
                  color: "#021f60",
                }}
              >
                {awardee.awardeeName.toUpperCase()}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Helvetica",
                  marginLeft: "120px",
                  marginRight: "10px",
                  marginTop: "15px",
                  fontSize: 10,
                }}
              >
                for being in the {awardee.ranking.toUpperCase()} with no grades
                below 85% in all subjects.
              </Text>
              <Text
                style={{
                  fontFamily: "Helvetica",
                  textAlign: "center",
                  marginTop: "15px",
                  fontSize: 10,
                  marginLeft: "139px",
                  marginRight: "17px",
                }}
              >
                Given this {formattedDate} during the {SessionData.quarter}{" "}
                Recognition at {SessionData.designationPlace}.
              </Text>

              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  alignItems: "center",
                  top: "210px",
                  marginLeft: "60px",
                  marginRight: "17px",
                  paddingLeft: 60,
                }}
              >
                <Image
                  src={SessionData.signatorySignature1}
                  style={{
                    height: "50",
                    width: "100",
                  }}
                />
                <Text
                  style={{
                    marginTop: "-30",
                    fontSize: 10,
                    fontFamily: "Times-Bold",
                  }}
                >
                  {SessionData.signatoryName1}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Times-Roman",
                    textAlign: "center",
                    width: "200",
                  }}
                >
                  {SessionData.signatoryPosition1}
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Helvetica-Bold",
                  marginTop: "50px",
                  fontSize: 20,
                  color: "#021f60",
                }}
              >
                {awardee.awardeeName.toUpperCase()}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Helvetica",
                  marginTop: "15px",
                  fontSize: 11,
                  marginHorizontal: "95",
                }}
              >
                for being in the {awardee.ranking.toUpperCase()} with no grades
                below 85% in all subjects.
              </Text>
              <Text
                style={{
                  fontFamily: "Helvetica",
                  textAlign: "center",
                  marginTop: "15px",
                  fontSize: 11,
                  marginHorizontal: "95",
                }}
              >
                Given this {formattedDate} during the {SessionData.quarter}{" "}
                Recognition at {SessionData.designationPlace}.
              </Text>

              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  alignItems: "center",
                  top: "176px",
                  paddingLeft: 60,
                }}
              >
                <Image
                  src={SessionData.signatorySignature1}
                  style={{
                    height: "50",
                    width: "100",
                  }}
                />
                <Text
                  style={{
                    marginTop: "-30",
                    fontSize: 11,
                    fontFamily: "Times-Bold",
                  }}
                >
                  {SessionData.signatoryName1}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Times-Roman",
                    textAlign: "center",
                    width: "200",
                  }}
                >
                  {SessionData.signatoryPosition1}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      {SessionData && awardeeList && (
        <div className="absolute flex z-40 h-full w-full overflow-y-hidden">
          <PDFViewer width="100%" height="100%">
            {generateCertificate(awardeeList)}
          </PDFViewer>
        </div>
      )}
      <SplashScreen displayMessage="Generating Certificate" />
    </>
  );
};

export default WMAATemplate;

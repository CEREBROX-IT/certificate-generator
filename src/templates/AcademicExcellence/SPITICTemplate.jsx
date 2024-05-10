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

const SPITICTemplate = () => {
  const dispatch = useDispatch();
  const userData = getUserDatafromToken();
  const userID = userData ? userData.decodedToken.userId : 0;
  const awardeeList = useSelector((state) => state.getAwardee?.data?.awardees);
  const SessionData = useSelector((state) => state.getSession?.data?.session);
  const [formattedDate, setFormattedDate] = useState("");

  // useEffect(() => {
  //   dispatch(getAwardee(userID));
  //   dispatch(getSession(userID));
  // }, [dispatch]);

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
      return; // Exit early if SessionData or its dateToPresent property is undefined
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
    if (!SessionData) {
      return null; // Return null or any other fallback content
    }
    const CertificateDocument = (
      <Document>
        {awardeeList.map((awardee, index) => (
          <Page key={index} size="letter" orientation="landscape">
            <View style={{ position: "relative", height: "100vh" }}>
              {/* Certificate content */}
              <Image
                src={SessionData.certificateTemplate}
                style={{
                  height: "100%",
                }}
              />
              <View
                style={{
                  position: "absolute",
                  height: "100vh",

                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",
                    marginTop: "185px",
                    fontSize: 30,
                  }}
                >
                  {awardee.ranking.toUpperCase()}
                </Text>
                <Text
                  style={{
                    fontFamily: "Times-Bold",
                    textAlign: "center",
                    marginTop: "30px",
                    fontSize: 34,
                    textDecoration: "underline",
                  }}
                >
                  {awardee.awardeeName.toUpperCase()}
                </Text>
                <Text
                  style={{
                    fontFamily: "Helvetica",
                    textAlign: "center",
                    marginTop: "10",
                    fontSize: 16,
                    marginHorizontal: "120",
                  }}
                >
                  of the {SessionData.gradeLevel} {SessionData.section} for
                  having an average of {awardee.avg} % for the{" "}
                  {SessionData.quarter}. Given this {formattedDate} at{" "}
                  {SessionData.designationPlace}.
                </Text>
                {SessionData.format === "2 Signature" ? (
                  <>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        marginTop: 70,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={SessionData.signatorySignature1}
                          style={{
                            height: "70",
                            width: "140",
                          }}
                        />
                        <Text
                          style={{
                            marginTop: "-30",
                            fontSize: 14,
                            fontFamily: "Times-Bold",
                            textDecoration: "underline",
                          }}
                        >
                          {SessionData.signatoryName1}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Times-Roman",
                            width: "200",
                            textAlign: "center",
                          }}
                        >
                          {SessionData.signatoryPosition1}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={SessionData.signatorySignature2}
                          style={{
                            height: "70",
                            width: "140",
                          }}
                        />
                        <Text
                          style={{
                            marginTop: "-30",
                            fontSize: 14,
                            fontFamily: "Times-Bold",
                            textDecoration: "underline",
                          }}
                        >
                          {SessionData.signatoryName2}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            width: "200",
                          }}
                        >
                          {SessionData.signatoryPosition2}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : SessionData.format === "3 Signature" ? (
                  <>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Image
                        src={SessionData.signatorySignature1}
                        style={{
                          height: "70",
                          width: "140",
                          marginTop: "10",
                        }}
                      />
                      <Text
                        style={{
                          marginTop: "-30",
                          fontSize: 14,
                          fontFamily: "Times-Bold",
                          textDecoration: "underline",
                          textAlign: "center",
                        }}
                      >
                        {SessionData.signatoryName1}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Times-Roman",
                          textAlign: "center",
                          width: "200",
                        }}
                      >
                        {SessionData.signatoryPosition1}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          width: "100%",

                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={SessionData.signatorySignature2}
                          style={{
                            height: "70",
                            width: "140",
                          }}
                        />
                        <Text
                          style={{
                            marginTop: "-30",
                            fontSize: 14,
                            fontFamily: "Times-Bold",
                            textDecoration: "underline",
                          }}
                        >
                          {SessionData.signatoryName2}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            width: "200",
                          }}
                        >
                          {SessionData.signatoryPosition2}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={SessionData.signatorySignature3}
                          style={{
                            height: "70",
                            width: "140",
                          }}
                        />
                        <Text
                          style={{
                            marginTop: "-30",
                            fontSize: 14,
                            fontFamily: "Times-Bold",
                            textDecoration: "underline",
                          }}
                        >
                          {SessionData.signatoryName3}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            width: "200",
                          }}
                        >
                          {SessionData.signatoryPosition3}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  SessionData.format === "4 Signature" && (
                    <>
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          marginTop: 15,
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={SessionData.signatorySignature1}
                            style={{
                              height: "70",
                              width: "140",
                            }}
                          />
                          <Text
                            style={{
                              marginTop: "-30",
                              fontSize: 14,
                              fontFamily: "Times-Bold",
                              textDecoration: "underline",
                            }}
                          >
                            {SessionData.signatoryName1}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "Times-Roman",
                              textAlign: "center",
                              width: "200",
                            }}
                          >
                            {SessionData.signatoryPosition1}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={SessionData.signatorySignature2}
                            style={{
                              height: "70",
                              width: "140",
                            }}
                          />
                          <Text
                            style={{
                              marginTop: "-30",
                              fontSize: 14,
                              fontFamily: "Times-Bold",
                              textDecoration: "underline",
                            }}
                          >
                            {SessionData.signatoryName2}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "Times-Roman",
                              textAlign: "center",
                              width: "200",
                            }}
                          >
                            {SessionData.signatoryPosition2}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "100%",

                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={SessionData.signatorySignature3}
                            style={{
                              height: "70",
                              width: "140",
                            }}
                          />
                          <Text
                            style={{
                              marginTop: "-30",
                              fontSize: 14,
                              fontFamily: "Times-Bold",
                              textDecoration: "underline",
                            }}
                          >
                            {SessionData.signatoryName3}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "Times-Roman",
                              textAlign: "center",
                              width: "200",
                            }}
                          >
                            {SessionData.signatoryPosition3}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={SessionData.signatorySignature4}
                            style={{
                              height: "70",
                              width: "140",
                            }}
                          />
                          <Text
                            style={{
                              marginTop: "-30",
                              fontSize: 14,
                              fontFamily: "Times-Bold",
                              textDecoration: "underline",
                            }}
                          >
                            {SessionData.signatoryName4}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "Times-Roman",
                              textAlign: "center",
                              width: "200",
                            }}
                          >
                            {SessionData.signatoryPosition4}
                          </Text>
                        </View>
                      </View>
                    </>
                  )
                )}
              </View>
            </View>
          </Page>
        ))}
      </Document>
    );

    return CertificateDocument;
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

export default SPITICTemplate;

import { Typography, Row, Col, Card, Space, Form, Input, message } from "antd";
import { useAnswerQuestion, useUserDetail } from "hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserProfile } from "ui";
import { Button } from "ui/atoms";

const { Paragraph, Text, Title } = Typography;

type Props = {
  questionObj: SQuestion;
  ableToAnswer: boolean;
};

const QuestionItem = ({ questionObj, ableToAnswer }: Props) => {
  const { t } = useTranslation("common");

  const [modifiedAnswer, setModifiedAnswer] = useState(
    questionObj.answers ? questionObj.answers[0] : ""
  );
  const [editingAnswer, setEditingAnswer] = useState(false);

  // const { data: profile } = useUserDetail(questionObj.ownerId as string);
  const { mutate, isLoading } = useAnswerQuestion();

  const handleEditAnswer = () => {
    // If submit answer

    if (editingAnswer == true) {
      const payload: AnswerQuestionPayload = {
        questionId: questionObj._id,
        answer: modifiedAnswer,
      };

      onAnswerQuestion(payload);
    }
    setEditingAnswer(!editingAnswer);
  };

  const onAnswerQuestion = (payload: AnswerQuestionPayload) => {
    mutate(
      {
        ...payload,
      },
      {
        onSuccess: (res) => {
          message.success("Answer question success");
        },
        onError: (err) =>
          message.error({
            content: JSON.stringify(err),
          }),
      }
    );
  };

  return (
    <Card
      type="inner"
      title={questionObj.question}
      style={{ width: "100%", marginBottom: 8 }}
      extra={
        ableToAnswer && (
          <Button type="primary" onClick={handleEditAnswer}>
            {editingAnswer ? t("save") : t("response")}
          </Button>
        )
      }
      bordered
    >
      <Row>
        <Col span={17}>
          <Card style={{ width: "100%", marginBottom: 4 }}>
            <Text strong style={{ paddingRight: 24 }}>{`${t(
              "question"
            )}:`}</Text>
            <Text>{questionObj.question}</Text>
          </Card>
          {editingAnswer ? (
            <Card style={{ width: "100%" }}>
              <Input.TextArea
                placeholder={t("yourAnswer") || "Your answer"}
                value={modifiedAnswer}
                onChange={(e) => setModifiedAnswer(e.target.value)}
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Card>
          ) : (
            <Card style={{ width: "100%" }}>
              <Text strong style={{ paddingRight: 24 }}>{`${t(
                "answer"
              )}:`}</Text>
              <Text>{modifiedAnswer}</Text>
            </Card>
          )}
        </Col>
        <Col span={6} offset={1}>
          <Space direction="vertical">
            <Text>
              <Text strong>{`${t("askBy")}: `}</Text>
              {questionObj.reporter}
            </Text>

            {/* {profile ? (
              <div>
                <Text strong>{`${t("inCommunity")}:`}</Text>
                <Row>
                  <UserProfile
                    avatarLink={profile.avatar}
                    name={profile?.displayName}
                  />
                </Row>
              </div>
            ) : (
              <></>
            )} */}
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default QuestionItem;

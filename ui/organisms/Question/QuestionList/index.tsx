import { Col, PaginationProps, Row, Empty, Pagination } from "antd";

import { SizeBox } from "ui/atoms";
import { QuestionItem } from "ui/molecules";

import { Container } from "./styled";

interface Props {
  pagination: PaginationProps;
  questions: SQuestion[];
  total: number;
  ableToAnswer: boolean;
}

const QuestionList = (props: Props) => {
  return (
    <Container>
      <Col>
        {(props.questions || []).map((question) => (
          <Row key={question._id}>
            <QuestionItem
              questionObj={question}
              ableToAnswer={props.ableToAnswer}
            />
          </Row>
        ))}
      </Col>
      {props.questions.length === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 300,
          }}
        >
          <Empty />
        </div>
      )}

      <Col span={24}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination {...props.pagination} total={props.total} />
        </div>
      </Col>
    </Container>
  );
};

export default QuestionList;

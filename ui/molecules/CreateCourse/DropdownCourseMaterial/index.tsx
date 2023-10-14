import {
  Collapse,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Typography,
} from "antd";
import { useTranslation } from "next-i18next";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Button, SizeBox } from "ui";
import { useState } from "react";
import AddTopicModal from "../AddTopicModal";
import AddLessonModal from "../AddLessonModal";
import { mockCourseTopics } from "src/infra/https/entities/course-topic/course-topic.mock";
import { mockCourseVideos } from "src/infra/https/entities/course-lesson/course-lesson.mock";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@mui/material";
import styled from "styled-components";

type Props = {
  courseIntroVideo: string;
};

const { Paragraph, Text, Title } = Typography;

const DropdownCourseMaterial = ({ courseIntroVideo }: Props) => {
  const data = mockCourseTopics;
  const dataLesson = mockCourseVideos;
  const { t } = useTranslation(["course"]);
  const [selectedTopic, setSelectedTopic] = useState<CourseTopic>();
  const [isTopicModalOpen, setisTopicModalOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson>();
  const [addTopicForm] = Form.useForm();
  const [addLessonForm] = Form.useForm();

  const onResetForm = () => {
    addTopicForm.resetFields();
  };

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const showTopicModal = () => {
    addTopicForm.resetFields();
    setisTopicModalOpen(true);
  };

  const handleTopicOk = () => {
    setisTopicModalOpen(false);
    console.log(addTopicForm.getFieldsValue(true));
  };

  const handleTopicCancel = () => {
    setisTopicModalOpen(false);
  };

  const handleModifyTopic = (topic: CourseTopic) => {
    // Implement the logic to handle the modify action
    // For example, you can open a modal or navigate to a modify page
    setSelectedTopic(topic);
    addTopicForm.setFieldValue("topicName", topic.title);
    addTopicForm.setFieldValue("topicSummary", topic.summary);
    setisTopicModalOpen(true);
    console.log("Modify topic with ID:", topic.id);
  };

  const handleDeleteTopic = (topicId: string) => {
    console.log("Delete topic with ID:", topicId);
  };

  const showLessonModal = () => {
    addLessonForm.resetFields();
    setIsLessonModalOpen(true);
  };

  const handleLessonOk = () => {
    setIsLessonModalOpen(false);
    console.log(addLessonForm.getFieldsValue(true));
  };

  const handleLessonCancel = () => {
    setIsLessonModalOpen(false);
  };

  const handleModifyLesson = (lesson: CourseLesson) => {
    setSelectedLesson(lesson);
    addLessonForm.setFieldValue("lessonName", lesson.title);
    addLessonForm.setFieldValue("lessonVideo", lesson.videoUrl);
    setIsLessonModalOpen(true);
  };

  const handleDeleteLesson = (topicId: string) => {
    console.log("Delete topic with ID:", topicId);
  };

  const genExtraTopic = (courseTopic: CourseTopic) => {
    return (
      <div>
        <IconButton
          style={{ marginRight: "8px" }}
          aria-label="Modify"
          onClick={(event) => {
            event.stopPropagation();
            handleModifyTopic(courseTopic);
          }}
        >
          <EditOutlinedIcon />
        </IconButton>
        <Popconfirm
          title="Are you sure you want to delete this topic?"
          onConfirm={() => handleDeleteTopic(courseTopic.id)}
          okText="Yes"
          cancelText="No"
        >
          <IconButton
            aria-label="Delete"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </Popconfirm>
      </div>
    );
  };

  const genExtraLesson = (lesson: CourseLesson) => {
    return (
      <div>
        <IconButton
          size="small"
          style={{ marginRight: "8px" }}
          aria-label="Modify"
          onClick={(event) => {
            handleModifyLesson(lesson);
            event.stopPropagation();
          }}
        >
          <EditOutlinedIcon />
        </IconButton>
        <Popconfirm
          title="Are you sure you want to delete this topic?"
          onConfirm={() => handleDeleteLesson(lesson.id)}
          okText="Yes"
          cancelText="No"
        >
          <IconButton
            size="small"
            aria-label="Delete"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </Popconfirm>
      </div>
    );
  };

  const DropdownLessonItem = (props: CourseLesson) => {
    return (
      <LessonItemContainer>
        <div className="left">
          <YouTubeIcon /> {props.title}
        </div>

        <div className="right">
          {`${props.time / 60}:00`}
          {genExtraLesson(props)}{" "}
        </div>
      </LessonItemContainer>
    );
  };

  return (
    <div>
      <Collapse defaultActiveKey={["1"]} onChange={onChange} size="large" ghost>
        <Collapse.Panel header={t("courseMaterial")} key="1">
          <Divider></Divider>
          <Form.Item
            name={"videoSource"}
            label={t("courseVideoSource")}
            rules={[{ required: true }]}
          >
            <Select defaultValue="youtube">
              <Select.Option value="youtube">
                {
                  <Row align={"middle"}>
                    <YouTubeIcon />
                    Youtube
                  </Row>
                }
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={"introVideo"}
            label={t("courseVideoIntro")}
            rules={[{ required: false }]}
          >
            <Input placeholder={t("pasteYoutubeURL") || ""} />
          </Form.Item>

          <Divider></Divider>
          <Title level={3}>{t("courseTopic")}</Title>
          <Divider></Divider>

          {data.map((courseTopic) => (
            <Collapse
              key={courseTopic.id}
              defaultActiveKey={["1"]}
              onChange={onChange}
              size="large"
            >
              <Collapse.Panel
                header={courseTopic.title}
                key={courseTopic.id}
                extra={genExtraTopic(courseTopic)}
              >
                {dataLesson.map((lesson) => (
                  <DropdownLessonItem key={lesson.id} {...lesson} />
                ))}

                <SizeBox height={8} />

                <Button size="small" onClick={showLessonModal}>
                  <AddCircleOutlineOutlinedIcon
                    style={{ marginRight: "8px" }}
                  />
                  {t("lessionWithVideo")}
                </Button>
              </Collapse.Panel>
            </Collapse>
          ))}

          <SizeBox height={8} />

          <Button type="primary" size="large" onClick={showTopicModal}>
            <AddCircleIcon style={{ marginRight: "8px" }} />
            {t("addNewTopic")}
          </Button>
        </Collapse.Panel>
      </Collapse>

      <Form
        form={addTopicForm}
        layout="vertical"
        size="large"
        labelCol={{ span: 24 }}
      >
        <AddTopicModal
          isModalOpen={isTopicModalOpen}
          handleOk={handleTopicOk}
          handleCancel={handleTopicCancel}
          selectedTopic={
            selectedTopic || {
              id: "",
              title: "",
              summary: "",
              courseLessons: mockCourseVideos,
            }
          }
        />
      </Form>

      <Form
        form={addLessonForm}
        layout="vertical"
        size="large"
        labelCol={{ span: 24 }}
        requiredMark={"optional"}
      >
        <AddLessonModal
          isModalOpen={isLessonModalOpen}
          handleOk={handleLessonOk}
          handleCancel={handleLessonCancel}
          selectedLesson={{
            id: "",
            title: "",
            description: "",
            videoUrl: "",
            time: 0,
          }}
        />
      </Form>
    </div>
  );
};

const LessonItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;

  .left {
    display: flex;
    align-items: center;
    svg {
      margin-right: 8px;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  }
`;

export default DropdownCourseMaterial;

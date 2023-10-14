import styled from "styled-components";
import React, { useCallback, useMemo, useRef } from "react";
import { Checkbox, Modal, Table, Typography, message } from "antd";

import {
  useCourseSection,
  useCourses,
  useCreateLesson,
  useDeleteLessons,
  useLessons,
  useMyProfile,
  useTablePagination,
} from "hooks";
import { queryClientInstance } from "src/infra/https";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddIcon from "@mui/icons-material/Add";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { Button } from "ui/atoms";
import { lessonQueryKeys } from "src/infra/https/keys/lesson";
import { CreateLessonModal, LessonSectionModal } from "ui/molecules";

const Container = styled.div`
  padding: 24px;
`;

const TitleContainer = styled.div`
  h3 {
    margin: 0;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  svg {
    margin-right: 8px;
  }
`;

const LessonManagement = () => {
  const createLessonModalRef = useRef<any>(null);
  const lessonSectionModalRef = useRef<any>(null);

  const { pagination, filter } = useTablePagination(5);

  const { data: myProfile } = useMyProfile();
  const { data, isLoading: dataLoading } = useCourses({
    offset: 0,
    limit: 10000,
    teacherId: myProfile?.id,
  });
  const { data: sections } = useCourseSection({
    offset: 0,
    limit: 10000,
  });
  const { data: lessons, isLoading: lessonsLoading } = useLessons(filter);

  const { mutate, isLoading } = useCreateLesson();
  const { mutate: deleteCourses, isLoading: deleteLoading } =
    useDeleteLessons();

  const selectedCourseRef = useRef<SLesson[]>([]);

  const onRemoteItems = useCallback(
    (videoIds: string[]) => {
      Modal.confirm({
        title: "Lesson Delete",
        icon: <ExclamationCircleFilled />,
        okText: "Confirm",
        cancelText: "Cancel",
        content: `Do you confirm to delete ${videoIds.length} ${
          videoIds.length > 1 ? "lessons" : "lesson"
        }`,
        okButtonProps: {
          loading: deleteLoading,
        },
        onOk: () => {
          deleteCourses(
            {
              videoIds:
                selectedCourseRef.current.length > 0
                  ? selectedCourseRef.current.map((e) => e._id)
                  : videoIds,
            },
            {
              onSuccess: () => {
                message.success(
                  `Delete success ${videoIds.length} ${
                    videoIds.length > 1 ? "courses" : "course"
                  }`
                );
                queryClientInstance.invalidateQueries({
                  queryKey: lessonQueryKeys.courseVideo(
                    data?.data?.[0]?._id || ""
                  ).queryKey,
                });
              },
              onError: (err) =>
                message.error(
                  err?.response?.data?.message || "Internal Server Error"
                ),
            }
          );
        },
      });
    },
    [deleteLoading, deleteCourses, data]
  );

  const columns: any[] = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        width: 200,
      },

      {
        title: "Course",
        dataIndex: "courseId",
        width: 200,
        render: (item: any) => {
          const courseName = data?.data.filter((course) => course._id === item);
          return <div>{courseName?.[0].name || "NULL"}</div>;
        },
      },
      {
        title: (
          <div style={{ display: "flex", alignItems: "center" }}>
            Section{" "}
            <Button
              style={{ marginLeft: 12 }}
              icon={<AddIcon />}
              onClick={() => lessonSectionModalRef.current.open()}
            />
          </div>
        ),
        dataIndex: "sectionId",
        width: 200,
        render: (item: any) => {
          const sectionName = sections?.data.filter(
            (section) => section._id === item
          );
          return <div>{sectionName?.[0].sectionName || "NULL"}</div>;
        },
      },
      {
        title: "Order",
        dataIndex: "no",
        width: 200,
      },
      {
        title: "Youtube link",
        dataIndex: "youtubeLink",
        width: 200,
      },
      {
        title: "Free",
        dataIndex: "isTrivial",
        width: 200,
        render: (item: any) => {
          return item ? <Checkbox checked={item} /> : null;
        },
      },
      {
        title: "Duration",
        dataIndex: "duration",
        width: 200,
      },
      {
        title: "Id",
        dataIndex: "_id",
        width: 200,
      },
      {
        title: "Action",
        key: "operation",
        width: 80,
        render: (_: any, col: SLesson) => (
          <Button
            onClick={() => onRemoteItems([col._id])}
            icon={<RemoveCircleIcon fontSize={"small"} color={"error"} />}
          />
        ),
        fixed: "right",
      },
    ],
    [data?.data, onRemoteItems, sections?.data]
  );

  const onOpenCreateModal = () => createLessonModalRef.current.openModal();

  const onCreateLesson = (payload: VideoPayload) => {
    mutate(payload, {
      onSuccess: (res) => {
        message.success("Create course success");
        createLessonModalRef.current.closeModal();
        queryClientInstance.invalidateQueries({
          queryKey: lessonQueryKeys.list(filter).queryKey,
        });
      },
      onError: (err) =>
        message.error(err?.response?.data?.message || "Internal Server Error"),
    });
  };

  return (
    <Container>
      <TitleContainer>
        <Typography.Title level={3}>Quản lý bài giảng</Typography.Title>

        <Button
          onClick={() => onOpenCreateModal()}
          size="large"
          icon={<ControlPointIcon />}
          type="primary"
        >
          Add
        </Button>
      </TitleContainer>
      <div>
        <Table
          rowSelection={{
            type: "checkbox",
            onChange: (
              selectedRowKeys: React.Key[],
              selectedRows: SLesson[]
            ) => {
              selectedCourseRef.current = selectedRows;
            },
            getCheckboxProps: (record: SLesson) => ({
              disabled: record.name === "Disabled User",
              name: record.name,
            }),
          }}
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={(lessons?.data || []).map((les) => ({
            ...les,
            key: les._id,
          }))}
          loading={dataLoading || lessonsLoading}
          pagination={{
            ...pagination,
            total: data?.total,
          }}
        />
      </div>

      <CreateLessonModal
        ref={createLessonModalRef}
        onConfirm={onCreateLesson}
        confirmLoading={isLoading}
      />
      <LessonSectionModal ref={lessonSectionModalRef} />
    </Container>
  );
};

export default LessonManagement;

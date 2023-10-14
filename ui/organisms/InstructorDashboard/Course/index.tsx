import styled from "styled-components";
import React, { useCallback, useMemo, useRef } from "react";
import { Modal, Table, Typography, message } from "antd";

import {
  useCourses,
  useCreateCourse,
  useDeleteCourse,
  useMyProfile,
  useTablePagination,
} from "hooks";
import { courseQueryKeys, queryClientInstance } from "src/infra/https";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { Button, MarkupView } from "ui/atoms";
import { CourseCategoryModal, CreateCourseModal } from "ui/molecules";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

type CreateCoursePayload = {
  name: string;
  thumnail: string;
  categoryId: string;
  description: string;
  shortDescription: string;
  achivementDes: string;
  prerequisiteDes: string;
  price: number;
};

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

const CourseManagement = () => {
  const createCourseModalRef = useRef<any>(null);
  const courseCategoryModalRef = useRef<any>(null);

  const { pagination, filter } = useTablePagination(5);
  const { mutate, isLoading } = useCreateCourse();
  const { mutate: deleteCourses, isLoading: deleteCoursesLoading } =
    useDeleteCourse();

  const { data: myProfile } = useMyProfile();
  const { data, isLoading: dataLoading } = useCourses({
    ...filter,
    teacherId: myProfile?.id,
  });

  const selectedCourseRef = useRef<SCourse[]>([]);

  const onRemoteItems = useCallback(
    (courseIds: string[]) => {
      Modal.confirm({
        title: "Course Delete",
        icon: <ExclamationCircleFilled />,
        okText: "Confirm",
        cancelText: "Cancel",
        content: `Do you confirm to delete ${courseIds.length} ${
          courseIds.length > 1 ? "courses" : "course"
        }`,
        okButtonProps: {
          loading: deleteCoursesLoading,
        },
        onOk: () => {
          deleteCourses(
            {
              courseIds:
                selectedCourseRef.current.length > 0
                  ? selectedCourseRef.current.map((e) => e._id)
                  : courseIds,
            },
            {
              onSuccess: () => {
                message.success(
                  `Delete success ${courseIds.length} ${
                    courseIds.length > 1 ? "courses" : "course"
                  }`
                );
                queryClientInstance.invalidateQueries({
                  queryKey: courseQueryKeys.list(filter).queryKey,
                });
              },
              onError: (e) => {
                message.error({
                  content: JSON.stringify(e),
                });
              },
            }
          );
        },
      });
    },
    [deleteCoursesLoading, deleteCourses, filter]
  );

  const columns: any[] = useMemo(
    () => [
      {
        title: "",
        dataIndex: "thumnail",
        width: 200,
        render: (data: string) => (
          <div>
            <img alt="thumnail" src={data} style={{ maxWidth: 160 }} />
          </div>
        ),
      },

      {
        title: "Course Name",
        dataIndex: "name",
        width: 200,
      },

      {
        title: "Price",
        dataIndex: "price",
        width: 200,
      },
      {
        title: (
          <div style={{ display: "flex", alignItems: "center" }}>
            Category{" "}
            <Button
              style={{ marginLeft: 12 }}
              icon={<KeyboardArrowDownIcon />}
              onClick={() => courseCategoryModalRef.current.open()}
            />
          </div>
        ),
        dataIndex: "categoryId",
        width: 200,
      },
      {
        title: "Course Description",
        dataIndex: "description",
        width: 200,
        render: (data: any) => <MarkupView html={data} />,
      },
      {
        title: "Achievement Description",
        dataIndex: "achivementDes",
        render: (data: any) => <MarkupView html={data} />,
      },
      {
        title: "Prerequisite Description",
        dataIndex: "prerequisiteDes",
        render: (data: any) => <MarkupView html={data} />,
      },
      {
        title: "Action",
        key: "operation",
        width: 80,
        render: (_: any, col: SCourse) => (
          // <div
          //   style={{
          //     display: "flex",
          //     alignItems: "center",
          //     justifyContent: "space-between",
          //   }}
          // >
          //   {/* <Button
          //     icon={<ModeEditIcon fontSize={"small"} color={"primary"} />}
          //   /> */}

          //   <Button
          //     onClick={() => onRemoteItems([col._id])}
          //     icon={<RemoveCircleIcon fontSize={"small"} color={"error"} />}
          //   />
          // </div>

          <Button
            onClick={() => onRemoteItems([col._id])}
            icon={<RemoveCircleIcon fontSize={"small"} color={"error"} />}
          />
        ),
        fixed: "right",
      },
    ],
    [onRemoteItems]
  );

  const onOpenCreateModal = () => createCourseModalRef.current.openModal();

  const onCreateCourse = (
    payload: CreateCoursePayload & {
      categoryId: string[];
    }
  ) => {
    mutate(
      {
        ...payload,
        categoryId: payload.categoryId[0],
        teacherName: myProfile?.name || "",
      },
      {
        onSuccess: (res) => {
          message.success("Create course success");
          createCourseModalRef.current.closeModal();
          queryClientInstance.invalidateQueries({
            queryKey: courseQueryKeys.list(filter).queryKey,
          });
        },
        onError: (err) =>
          message.error({
            content: JSON.stringify(err),
          }),
      }
    );
  };

  return (
    <Container>
      <TitleContainer>
        <Typography.Title level={3}>Quản lý khoá học</Typography.Title>

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
              selectedRows: SCourse[]
            ) => {
              selectedCourseRef.current = selectedRows;
            },
            getCheckboxProps: (record: SCourse) => ({
              disabled: record.name === "Disabled User",
              name: record.name,
            }),
          }}
          scroll={{ x: 1600 }}
          columns={columns}
          dataSource={(data?.data || []).map((e) => ({
            ...e,
            key: e._id,
          }))}
          loading={dataLoading}
          pagination={{
            ...pagination,
            total: data?.total,
          }}
        />
      </div>

      <CreateCourseModal
        ref={createCourseModalRef}
        onConfirm={onCreateCourse}
        confirmLoading={isLoading}
      />

      <CourseCategoryModal ref={courseCategoryModalRef} />
    </Container>
  );
};

export default CourseManagement;

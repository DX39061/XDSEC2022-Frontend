<template>
  <n-card class="user-list-card" hoverable>
    <n-space vertical>
      <n-input style="text-align: left" v-model:value="query" placeholder="输入关键词过滤"
               @change="handlePageChange(pagination.page)"/>
      <n-data-table
          :columns="columns"
          :bordered="false"
          :data="users"
          :pagination="pagination"
          :remote="true"
          @update:page="handlePageChange"
      />
    </n-space>
  </n-card>

</template>

<script lang="ts">
import {defineComponent, h, reactive, ref} from "vue";
import {DataTableColumns, NButton} from "naive-ui";
import {getUserCount, getUserList, UserCountResponse, UserShortResponse} from "@/api/user";
import router from "@/router";

const createColumns = ({
                         jumpToUser
                       }: {
                         jumpToUser: (row: UserShortResponse) => void
                       }, {
                         jumpToInterview
                       }: {
                         jumpToInterview: (row: UserShortResponse) => void
                       }
): DataTableColumns<UserShortResponse> => {
  return [
    {
      title: 'No',
      key: 'id',
    },
    {
      title: '昵称',
      key: 'nick-name'
    },
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '性别',
      key: 'sex',
    },
    {
      title: '学院/专业',
      key: 'major',
    },
    {
      title: '详细',
      key: 'detail',
      render(row) {
        return h(
            NButton,
            {
              size: 'small',
              onClick: () => jumpToUser(row),
            },
            {default: () => '详细信息'}
        );
      },
    },
    {
      title: '面试',
      key: 'interview',
      render(row) {
        return h(
            NButton,
            {
              size: 'small',
              onClick: () => jumpToInterview(row),
            },
            {default: () => '面试信息'}
        )
      }
    }
  ]
}

export default defineComponent({
  name: "ListUser",
  setup() {
    const users = ref([] as UserShortResponse[]);
    const query = ref('');
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 10,
    });
    return {
      users,
      query,
      columns: createColumns({
            jumpToUser(row) {
              router.push(`/admin/users/${row.id}`)
            },
          }, {
            jumpToInterview(row) {
              router.push(`/admin/interviews/${row.id}`)
            }
          }
      ),
      bodyStyle: {
        width: '600px'
      },
      segmented: {
        content: 'soft',
        footer: 'soft'
      } as const,
      pagination: paginationReactive,
      handlePageChange(currentPage: number) {
        getUserList(10, (currentPage - 1) * 10, query.value).then((resp: UserShortResponse[]) => {
          // console.log(resp)
          users.value = resp;
          paginationReactive.page = currentPage;
        }).catch((error) => {
          window.$message.error('获取用户列表失败 ' + error.message);
          users.value = new Array<UserShortResponse>();
        });
      },
    }
  },
  mounted() {
    getUserList().then((resp: UserShortResponse[]) => {
      window.$message.success('获取用户列表成功')
      this.users = resp;
    }).catch((error) => {
      window.$message.error('获取用户列表失败 ' + error.message);
      this.users = new Array<UserShortResponse>();
    });
    getUserCount().then((resp: UserCountResponse) => {
      this.pagination.pageCount = Math.ceil(resp.total / this.pagination.pageSize);
      window.$message.success('获取用户数量成功')
    }).catch((error) => {
      window.$message.error('获取用户数量失败' + error.message);
      this.pagination.pageCount = 1;
    });
  },
})
</script>

<style lang="sass">
.user-list-card
  max-width: 800px
  margin: 2rem auto

</style>
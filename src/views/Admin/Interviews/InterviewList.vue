<template>
  <n-card class="interview-list-card" hoverable>
    <n-space vertical>
      <n-input style="text-align: left" v-model:value="query" placeholder="输入关键词过滤" @change="handlePageChange(pagination.page)"/>
      <n-data-table
          :columns="columns"
          :bordered="false"
          :data="interviews"
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
import router from "@/router";
import {getInterviewCount, getInterviewList, InterviewShortResponse} from "@/api/interview";

const createColumns = ({
                         jumpToInterview
                       }: {
  jumpToInterview: (row: InterviewShortResponse) => void
}): DataTableColumns<InterviewShortResponse> => {
  return [
    {
      title: 'No',
      key: 'id',
    },
    {
      title: '最后修改时间',
      key: 'updated-at',
      render(row) {
        return row['updated-at'].toLocaleString()
      }
    },
    {
      title: '面试者',
      key: 'interviewee',
    },
    {
      title: '轮次',
      key: 'round',
    },
    {
      title: '面试官',
      key: 'interviewer',
    },
    {
      title: '是否通过',
      key: 'pass',
      render(row) {
        return String(row.pass)
      }
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
            NButton,
            {
              size: 'small',
              onClick: () => jumpToInterview(row),
            },
            {default: () => '详细信息'}
        );
      },
    }
  ]
}

export default defineComponent({
  name: "ListInterview",
  setup() {
    const interviews = ref([] as InterviewShortResponse[]);
    const query = ref('');
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 10,
    });
    return {
      interviews,
      query,
      columns: createColumns({
        jumpToInterview(row) {
          router.push('/admin/interviews/' + row["interviewee-id"] )
        }
      }),
      bodyStyle: {
        width: '600px'
      },
      segmented: {
        content: 'soft',
        footer: 'soft'
      } as const,
      pagination: paginationReactive,
      handlePageChange(currentPage: number) {
        getInterviewList(10, (currentPage - 1) * 10, query.value).then((resp: InterviewShortResponse[]) => {
          // console.log(resp)
          interviews.value = resp;
          paginationReactive.page = currentPage;
        }).catch((error) => {
          window.$message.error('获取面试列表失败 ' + error.message);
          interviews.value = new Array<InterviewShortResponse>();
        });
      },
    }
  },
  mounted() {
    getInterviewList().then((resp: InterviewShortResponse[]) => {
      this.interviews = resp;
      window.$message.success('获取面试列表成功')
    }).catch((error) => {
      window.$message.error('获取面试列表失败 ' + error.message);
      this.interviews = new Array<InterviewShortResponse>();
    });
    getInterviewCount().then((resp: number) => {
      this.pagination.pageCount = Math.ceil(resp / this.pagination.pageSize);
      window.$message.success('获取面试数量成功')
    }).catch((err: Error) => {
      window.$message.error('获取数量失败' + err.message);
      this.pagination.pageCount = 1;
    });
  },
})
</script>

<style lang="sass">
.interview-list-card
  max-width: 800px
  margin: 2rem auto

</style>
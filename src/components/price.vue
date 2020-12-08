<template>
  <div class="content1">
    <el-row class="content-title">
      <el-col :span="18">
        <div class="screen">
          <el-input
            v-model="input"
            size="mini"
            placeholder="请输入搜索内容"
            class="input-with-select"
            @clear='clearInput'
            clearable
          >
            <el-select
              v-loadmore
              v-model="inputSelect"
              slot="prepend"
              placeholder="请选择"
            >
              <el-option
                label="名称"
                value="1"
              ></el-option>
              <el-option
                label="地区"
                value="2"
              ></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search(1)"
            ></el-button>
          </el-input>
        </div>
        <!-- 当地人材机价格库 -->
      </el-col>
      <el-col
        :span="6"
        class="content-handle"
      >
        <el-button
          type="primary"
          icon="el-icon-plus"
          size='mini'
          @click="showAdd"
        >新增</el-button>
      </el-col>
    </el-row>
    <div class="table-list">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="getRowClass"
      >
        <el-table-column
          prop="date"
          label="名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              class="project-name"
              @click='handleDetail(scope.row)'
            >
              <img
                src="../assets/image/database.png"
                alt=""
                class="data-icon"
              >
              <el-button type='text'>{{scope.row.name}}</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="地区"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="创建人"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          width="150"
          :formatter="formatTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClickUpdate(scope.row,scope.$index)"
              type="text"
            >编辑</el-button>
            <el-button
              @click="handleClickDelete(scope.row,scope.$index)"
              type="text"
              class="btn-del"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        class="pagination-wrapper"
        v-if="total>0"
      >
        <el-pagination
          layout="prev, pager, next"
          @current-change='pageChange'
          :current-page.sync="currentPage"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="this.dialogType===1?'新增材价库':'编辑材价库'"
      :visible.sync="dialogAdd"
      width="438px"
      :close-on-click-modal='false'
      @close='dialogClose'
      v-dialogDrag
    >
      <el-form :model="formAddList">
        <el-form-item
          label="名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formAddList.name"
            placeholder="材价库名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="地区"
          :label-width="formLabelWidth"
        >
          <el-cascader
            v-loadmore
            :options="options"
            clearable
            filterable
            v-model="formAddList.selectedOptions"
            :disabled="this.dialogType===2"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <div class="dialog-footer-wrapper">
        <el-button
          size='middle'
          type="primary"
          @click="submit"
        >完成</el-button>
      </div>
    </el-dialog>
    <!-- appear
      name="el-zoom-in-bottom" -->
    <transition
      enter-active-class="animated slideInRight"
      :duration="200"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { formatTime } from '../assets/js/utils'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialogAdd: false,
      inputSelect: '1',
      input: '',
      total: 0,
      currentPage: 1,
      dialogType: 1,
      curId: '',
      selectedOptionsCountry: [],
      optionsData: [],
      formLabelWidth: '80px',
      formAddList: { name: '', selectedOptions: [] },
      options: [],
      tableData: [],
      editIndex: -1
    }
  },
  computed: {
    ...mapGetters([
      'getPermission'
    ])
  },
  mounted () {
    console.log(1)
    this.init(1)
    this.getUseArea()
  },
  methods: {
    clearInput () {
      this.getData(1)
      this.currentPage = 1
    },
    search (page) {
      if (this.input === '') {
        this.$message.warning('请输入搜索内容')
      } else {
        this.getData(page)
      }
    },
    getData (page) {
      let data = {
        page: page
      }
      if (this.inputSelect === '1') {
        data.name = this.input
      } else if (this.inputSelect === '2') {
        data.areaName = this.input
      }
      this.$get('/api/bank/permission/getMaterialsBanks', data).then(res => {
        if (res.status === 0) {
          this.tableData = res.data.bank
          this.total = res.data.count
        } else {
          this.$message.error(res.error.message)
        }
      })
    },
    init (page) {
      this.getData(page)
    },
    pageChange (page) {
      this.getData(page)
    },
    submit () {
      if (this.dialogType === 1) {
        this.$post('/api/bank/permission/maintain/addMaterialsBanks', { name: this.formAddList.name, areaId: this.formAddList.selectedOptions[this.formAddList.selectedOptions.length - 1] }).then(res => {
          if (res.status === 0) {
            this.$message.success('添加成功')
            this.getData(1)
            this.dialogAdd = false
          } else {
            this.$message.error(res.error.message)
          }
        })
      } else {
        this.$post('/api/bank/permission/maintain/updateMaterialsBanks', { name: this.formAddList.name, id: this.curId }).then(res => {
          if (res.status === 0) {
            this.$message.success('编辑成功')
            this.dialogAdd = false
            this.tableData[this.editIndex].name = this.formAddList.name
          } else {
            this.$message.error(res.error.message)
          }
        })
      }
    },
    getUseArea () {
      this.$get('/api/area/getUseArea').then(res => {
        if (res.status === 0) {
          this.options = res.data
          this.optionsData = res.data
        }
      })
    },
    handleClickUpdate (row, index) {
      this.dialogAdd = true
      this.dialogType = 2
      this.formAddList.name = row.name
      this.editIndex = index
      this.curId = row.id
      this.$get('/api/area/getAreaPlace', { id: row.areaId }).then(res => {
        if (res.status === 0) {
          this.formAddList.selectedOptions = res.data
        }
      })
    },
    handleClickDelete (row, index) {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/api/bank/permission/maintain/deleteMaterialsBanks', { id: row.id }).then(res => {
          if (res.status === 0) {
            this.$message.success('删除成功')
            this.tableData.splice(index, 1)
          } else {
            this.$message.error(res.error.message)
          }
        })
      }).catch(() => {
        this.$message.info({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleDetail (row) {
      this.$router.push({ path: `price/${row.id}`, query: { name: row.name } })
    },
    getRowClass ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#F6F6F6;border-bottom:none'
      } else {
        return ''
      }
    },
    showAdd () {
      this.dialogType = 1
      this.dialogAdd = true
    },
    handleChange () {

    },
    dialogClose () {
      this.formAddList.name = ''
      this.formAddList.selectedOptions = []
    },
    formatTime (row, col) {
      return formatTime(row.createTime, 'Y-M-D h:m')
    }
  }
}
</script>

<style scoped lang="scss">
@import url("../assets/css/rewrite.scss");
.table-list {
  margin-top: 10px;
}
.pagination-wrapper {
  text-align: center;
  margin-top: 50px;
}
.content-title {
  height: 30px;
}
.content-handle {
  text-align: right;
}
.data-icon {
  vertical-align: middle;
}
.screen .el-select {
  width: 80px;
}
/deep/ .screen .el-select .el-input__inner {
  width: 80px !important;
}
.input-with-select {
  width: 270px;
}
</style>

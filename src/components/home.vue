<template>
  <div
    class="content"
    v-loading="loading"
  >
    <div class="heard">
      <div class="left-input">
        <el-input
          size="mini"
          clearable
          @clear="init(1)"
          placeholder="请输入内容"
          v-model="projectName"
        >
          <el-button
            @click="init(1)"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </div>
      <div class="right-button">
        <el-button
          type="primary"
          @click.native="append"
          size="mini"
          class="button2"
          icon="el-icon-plus"
        >新增</el-button>
      </div>
    </div>
    <div class="specialtyDiv">
      <div class="specialtyDiv_left">
        <img
          width="0"
          style="vertical-align:middle;height:100%"
        >
        专业
      </div>
      <div class="specialtyDiv_right">
        <span
          class="span"
          v-for="(k,index) in zhuanye"
          :key="index"
          :class="{'last':index===zhuanye.length-1,  'bgcActive': k.isActive}"
          @click="major(1,index)"
          :title="k.specialtyName"
        >
          <dt>
            <img
              :src="'/ccecc/api/client/showImg?imgId='+k.specialtyPictureId+'&&token=' + $store.state.token"
              width="50"
              height="50"
            />
          </dt>
          <dd>{{k.specialtyName}}</dd>
        </span>
      </div>
    </div>
    <div class="clear"></div>
    <!-- 所属部门 -->
    <div class="suoshu">
      <div class="left">所属部门：</div>
      <ul>
        <li>
          <el-select
            class="suoshu_input"
            v-model="department"
            size="mini"
            clearable
            @change="init(1)"
            placeholder="请选择所属部门"
          >
            <el-option
              v-for="item in suoshu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <div class="clear"></div>
    <div class="xiangmu">
      <div class="left">发包方式：</div>
      <ul class="ul-xiangmu">
        <li
          class="liarr-xiangmu "
          @click="major(3,index)"
          v-for="(k,index) in contracting"
          :class="{'liarr-first':index==0}"
          :key="index"
        >
          <span
            class="spanTag"
            :class="{'tagActive': k.isActive}"
          > {{k.name}}
            <i
              @click.stop="tagDelete(3,index)"
              v-show="k.isActive"
              class="el-icon-close"
            ></i></span>
        </li>
      </ul>
    </div>
    <div class="clear"></div>
    <!-- 立项状态 -->
    <div class="xiangmu bdb">
      <div class="left">立项状态：</div>
      <ul class="ul-xiangmu">
        <li
          class="liarr-xiangmu"
          :class="{'liarr-first':index==0}"
          v-for="(k, index) in xiangmu"
          @click="major(4,index)"
          :key="index"
        >
          <span
            class="spanTag"
            :class="{'tagActive': k.isActive}"
          > {{k.name}}
            <i
              @click.stop="tagDelete(4,index)"
              v-show="k.isActive"
              class="el-icon-close"
            ></i></span>
        </li>
      </ul>
    </div>
    <div class="all"></div>
    <!-- 阿尔及利亚 -->
    <div class="body">
      <ul>
        <li
          class="body-liarr"
          v-for="(k, index) in erji"
          :key="index"
          @click="BidProjectDetail(index)"
        >
          <div class="left">
            <!-- <img
              :src="k.url"
              alt
            /> -->
            <img
              width="161"
              height="95"
              :src='"/ccecc/api/client/showImg?type=2&imgId="+k.pictureId+"&&token=" + $store.state.token'
              alt=""
            >
          </div>
          <div class="right">
            <p>
              <span v-html="k.projectName"></span>
              <!-- {{k.englishName}} -->
              (<i v-html="k.englishName"></i>)
            </p>
            <ul class="body-ul">
              <li>项目所在国：<span v-html="k.areaName"></span></li>
              <li>项目所在地：<span v-html="k.address"></span></li>
              <li>承包方式：
                <span v-show="k.jobMode==='1'"> 总包</span>
                <span v-show="k.jobMode==='2'"> 分包</span>
                <span v-show="k.jobMode==='3'"> 联营</span>
              </li>
              <li>专业：<span v-html="k.specialtyName"></span></li>
              <li>所属部门：<span v-html="k.orgName"></span></li>
              <li>
                立项状态：
                <span v-show="k.status==='1'">待提交审批</span>
                <span v-show="k.status==='2'">审批中</span>
                <span v-show="k.status==='3'">通过</span>
                <span v-show="k.status==='4'">未通过</span>
              </li>
            </ul>
            <div class="money">
              <!-- 投标金额usd:
              <span>611.82万美元</span> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="footer"
      v-show="total>0"
    >
      <el-pagination
        background
        @current-change='pageChange'
        :current-page.sync='pageNumber'
        layout="prev, pager, next"
        :page-size="6"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { allOrg } from '../assets/js/cceccData'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      props: { multiple: true },
      aa: 2,
      params: {},
      projectName: '',
      pageNumber: 1,
      total: 1,
      all: {
        specialty: '',
        department: '',
        contractingMethod: '',
        projectStatus: ''
      },
      arr: [],
      zhuanye: [],
      suoshu: allOrg,
      contracting: [{ name: '总包', isActive: false }, { name: '分包', isActive: false }, { name: '联营', isActive: false }],
      xiangmu: [
        {
          name: '待提交审批',
          isActive: false
        },
        {
          name: '审批中',
          isActive: false
        },
        {
          name: '通过',
          isActive: false
        },
        {
          name: '未通过',
          isActive: false
        }
      ],
      erji: [{"permission":null,"areaName":"洪都拉斯","specialtyName":"铁路工程","userName":"马超","orgName":"中土埃塞俄比亚工程有限公司","consultingCompanyNationName":null,"applying":null,"consultingNation":null,"nationInfo":null,"bqBill":null,"defaultAttribute":false,"contractBook":null,"contractEndWorkDate":null,"contractMoneyLoc":null,"moneyName":null,"contractMoneyUsd":null,"contractStartWorkDate":null,"contractType":null,"contractDate":null,"endWorkCertificate":null,"performanceTestify":null,"projectContent":null,"projectIntroReport":null,"projectStaff":null,"realityStartWorkDate":null,"realityEndWorkDate":null,"settleAccountsMoneyLoc":null,"settleAccountsMoneyUsd":null,"signAContract":null,"soilStone":null,"updateDate":null,"usdExchangeRate":null,"ownerAddress":null,"ownerEmail":null,"ownerFax":null,"ownerPhone":null,"briefIntroduction":null,"mainJob":null,"constructionConditions":null,"designTask":null,"contractDuration":null,"warrantyPeriod":null,"qualificationPurchaseDate":null,"tenderPurchaseDate":null,"qualificationRequirements":null,"assessedDate":null,"bidDeadlineDate":null,"specialRequirement":null,"tenderMethod":null,"projectScale":null,"paymentCurrencyType":null,"usdPercentage":null,"prepayments":null,"retentionMoney":null,"loan":null,"loanCondition":null,"bidBond":null,"performanceBond":null,"downPaymentDeposit":null,"penaltyForBreachOfContract":null,"taxRegulations":null,"insuranceClaim":null,"entryRestrictions":null,"otherThingsToExplain":null,"competitor":null,"riskDetails":null,"tenderComplianceRiskLevel":null,"businessUnit":null,"ownerUnit":null,"designUnit":null,"supervisionUnit":null,"plannedStartDate":null,"plannedCompletionDate":null,"projectManagerMode":null,"mainEngineeringQuantity":null,"mainProgress":null,"outputValuePlan":null,"outputValueComplete":null,"planningOutline":null,"implementationPlanning":null,"implementationDesign":null,"keyControlEngineering":null,"contactDetails":null,"principal":null,"mainCooperationUnit":null,"remark":null,"projectGuid":"6ae3f7ec-4b73-447a-b7ac-abab1114dcf1","projectName":"测试","englishName":"text","countryId":"02cf02d6-1dc5-4aa5-a3db-62afe75c08bd","address":"洪都","jobMode":"2","sourcesOfFunds":null,"sourcesOfFundsDetail":null,"sourcesOfFundsStr":null,"sourcesOfFundsParent":null,"sourcesOfFundsOther":null,"specialtyGuid":"f30b9e7a-0289-4b99-b08c-82599074eabf","createTime":1603505635000,"updateTime":1603505635000,"status":"4","projectStage":"0","projectStatus":null,"qualificationType":"2","orgId":"163ae1ef-889f-485d-adab-f9151cf4d571","userId":"30ff2120-c7f1-41bc-a5ca-e9aa506b4038","contractNumber":"","consultingCompany":"","consultingCompanyNation":"","contractorName":"","pictureId":"","projectType":null,"projectArchiveStatus":"0","bEton":null}],
      department: [],
      loading: false
    }
  },
  mounted () {
    // this.init(1)
    this.getSpecialty()
  },
  methods: {
    handleChange () {
      this.init(1)
    },
    append () {
      this.$router.push({ path: '/addApproval' })
    },
    tagDelete (num, index) {
      if (num === 2) {
        this.suoshu[index].isActive = false
      } else if (num === 3) {
        this.contracting[index].isActive = false
      } else if (num === 4) {
        this.xiangmu[index].isActive = false
      }
      this.init(1)
    },
    BidProjectDetail (index) {
      this.$router.push({
        path: '/projectApprovalDetall',
        query: {
          projectId: this.erji[index].projectGuid
        }
      })
    },
    init (page) {
      this.loading = true
      this.pageNumber = page
      let specialty = this.zhuanye.map(item => {
        if (item.isActive) {
          return item.specialtyGuid
        } else {
          return ''
        }
      })
      let contractingMethod = this.contracting.map((item, index) => {
        if (item.isActive) {
          // console.log(index)
          return index + 1
        } else {
          return 0
        }
      })
      let projectStatus = this.xiangmu.map((item, index) => {
        if (item.isActive) {
          // console.log(index)
          return index + 1
        } else {
          return 0
        }
      })
      let data = {
        specialty,
        contractingMethod,
        projectStatus,
        pageNumber: this.pageNumber,
        projectName: this.projectName,
        department: [this.department]
      }
      // console.log(data)
      this.$postJson('/api/startProject/permission/selectProjectApprovalByCondition', data).then(res => {
        if (res.status === 0) {
          // console.log(res.data)
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].contractingMethod === 1) {
              res.data.list[i].contractingMethod = '总包'
            } else if (res.data.list[i].contractingMethod === 2) {
              res.data.list[i].contractingMethod = '分包'
            } else if (res.data.list[i].contractingMethod === 3) {
              res.data.list[i].contractingMethod = '联营'
            }
          }
          this.erji = res.data.list
          this.total = res.data.total
          this.loading = false
        }
      }).catch(err => {
        if (err) {
          throw err
        }
      })
    },
    getSpecialty () {
      this.$get('/api/special/getSpecialty').then(res => {
        if (res.status === 0) {
          // console.log(res.data)
          res.data.forEach(item => {
            item.isActive = false
          })
          this.zhuanye = res.data
        }
      }).catch(err => {
        if (err) {
          throw err
        }
      })
    },
    major (num, index) {
      if (num === 1) {
        this.zhuanye[index].isActive = !this.zhuanye[index].isActive
      } else if (num === 2) {
        this.suoshu[index].isActive = true
      } else if (num === 3) {
        this.contracting[index].isActive = true
      } else if (num === 4) {
        this.xiangmu[index].isActive = true
      }
      // console.log(this.contracting[index])
      this.init(1)
    },
    pageChange (page) {
      this.pageNumber = page
      this.init(page)
    }
  }
}
</script>
<style scoped >
.last {
  border-right: 1px solid #dddddd;
}
.heard {
  height: 65px;
  line-height: 65px;
}
.left-input {
  float: left;
  width: 200px;
  height: 32px;
  margin-left: 26px;
}
.right-button {
  float: right;
}
.button1 {
  width: 90px;
  background-color: #0ca183;
}
.button2 {
  width: 90px;
  margin-right: 30px;
  background-color: #4a90e2;
}
.zhuanye {
  /* margin-left: 30px; */
  width: 97%;
  margin: auto;
  height: 89px;
  /* border-bottom: 1px solid #ddd; */
  border-top: 1px solid #dddddd;
}
.zhuanye > .left {
  font-size: 14px;
  line-height: 89px;
  text-indent: 14px;
  float: left;
  width: 120px;
  height: 89px;
  background-color: #eafcff;
}
ul {
  list-style: none;
}
.liarr {
  border-left: 1px solid #dddddd;
  float: left;
  width: 89px;
  height: 88px;
  text-align: center;
}
.liarr > dt {
  margin-top: 10px;
}
.suoshu {
  height: 40px;
  width: 97%;
  margin: auto;
  /* margin-bottom: -1px; */
  /* border-bottom: 1px solid #ddd;  */
  border-top: 1px solid #dddddd;
}
.suoshu > .left {
  float: left;
  width: 120px;
  height: 40px;
  border-right: 1px solid #ddd;
  font-size: 14px;
  background-color: #eafcff;
  line-height: 40px;
  text-indent: 14px;
}
.liarr-suoshu {
  float: left;
  font-size: 14px;
  color: #4a90e2;
  margin-left: 20px;
  line-height: 40px;
  cursor: pointer;
}
.xiangmu {
  width: 97%;
  margin: auto;
  height: 40px;
  /* margin-bottom: -1px; */
  border-top: 1px solid #dddddd;
  /* border-bottom: 1px solid #dddddd; */
}
.xiangmu > .left {
  float: left;
  width: 120px;
  height: 40px;
  font-size: 14px;
  border-right: 1px solid #ddd;
  background-color: #eafcff;
  line-height: 40px;
  text-indent: 14px;
}
.liarr-xiangmu {
  /* width: 100px; */
  font-size: 14px;
  float: left;
  line-height: 40px;
  color: #4a90e2;
  margin-right: 40px;
  cursor: pointer;
}
.liarr-first {
  margin-left: 20px;
}
.body {
  width: 97%;
  border-bottom: 1px solid #cbe8ed;
  margin: auto;
}
.body-liarr {
  position: relative;
  border-top: 1px solid #cbe8ed;
  height: 111px;
  overflow: hidden;
  cursor: pointer;
}
.body-liarr > .left {
  float: left;
  /* margin-top: 7px; */
  position: absolute;
  top: 50%;
  /* left: 50%; */
  transform: translate(0%, -50%);
}
.body-liarr > .right {
  width: 83%;
  margin-left: 183px;
  float: left;
  margin-top: 7px;
}
.body-liarr > .right > p {
  font-size: 16px;
  line-height: 30px;
  overflow: hidden;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  white-space: nowrap;
}
.body-liarr > .right > p > span {
  font-size: 16px;
  margin-right: 8px;
  color: #1a58a2;
  cursor: pointer;
}
.body-liarr > .right > p > i {
  font-style: normal;
  font-size: 12px;
}
.body-ul {
  width: 800px;
  font-size: 12px;
  color: #666666;
}
.body-ul > li {
  font-size: 12px;
  width: 190px;
  float: left;
  height: 22px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.body-ul > li > span {
  font-size: 12px;
}
.money {
  font-size: 12px;
  width: 202px;
  height: 25px;
  position: absolute;
  right: 0;
  bottom: 5px;
}
.money > span {
  color: #f76d6d;
  font-size: 18px;
}
.all {
  height: 30px;
  margin-top: 1px;
  width: 97%;
  margin: auto;
  line-height: 60px;
}
.zhuanye > ul > li:hover {
  background-color: #d9ebff;
  cursor: pointer;
}
.em {
  background-color: #f00;
}
.footer {
  text-align: center;
  margin-top: 20px;
  line-height: 40px;
}
.spanTag {
  padding: 5px;
}
.tagActive {
  border: 1px solid #4a90e2;
  background-color: #ffe8c8;
}
.spanTag .el-icon-close {
  margin: 3px;
  font-size: 14px;
}
.spanTag .el-icon-close:hover {
  background-color: #4a90e2;
  color: #fff;
}
.bgcActive {
  background-color: #ffe8c8;
}
.suoshu_input {
  margin-top: 6px;
  margin-left: 20px;
}
.bdb {
  border-bottom: 1px solid #ddd;
}
.specialtyDiv {
  width: 97%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  border-top: 1px solid #dddddd;
}
.specialtyDiv_left {
  float: left;
  font-size: 14px;
}
.specialtyDiv_left {
  background-color: #eafcff;
  width: 120px;
  text-indent: 14px;
  position: absolute;
  top: 0;
  bottom: 0;
}
.specialtyDiv_right {
  padding-left: 120px;
}
.span {
  display: inline-block;
  border-left: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  margin-bottom: -1px;
  width: 89px;
  height: 88px;
  text-align: center;
}
.span:hover {
  background-color: #d9ebff;
  cursor: pointer;
}
.span > dt {
  margin-top: 10px;
}
.span dd {
  font-size: 12px;
  padding: 0 5px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

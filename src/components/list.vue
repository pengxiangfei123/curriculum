<template>
  <div>
    <div class="header">
      <el-col :span="12">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          size="mini"
          class="search_input"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
      <el-col
        :span="12"
        class="algin-right"
      >
        <el-button
          size="mini"
          type="primary"
        >
          新增
        </el-button>
      </el-col>
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
    <div class="org">
      <div class="org_left">
        所属部门
      </div>
      <div class="org_right">
        <el-select
          class="suoshu_input"
          v-model="orgId"
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
      </div>
    </div>
    <div class="org">
      <div class="org_left">
        承包方式
      </div>
      <div class="org_right">
        <ul>
          <li
            class="liarr-xiangmu "
            @click="major(index)"
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
    </div>
    <div class="org status">
      <div class="org_left">
        立项状态
      </div>
      <div class="org_right">
        <ul>
          <li
            class="liarr-xiangmu "
            @click="major(index)"
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
    </div>

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
export default {
  data () {
    return {
      input: '',
      zhuanye: [
        {
          sort: 0,
          specialtyGuid: "f30b9e7a-0289-4b99-b08c-82599074eabf",
          specialtyName: "铁路工程",
          specialtyPictureId: "f1cf1b68-c3db-4b70-b03c-5af88420f4a4"
        },
        {
          sort: 0,
          specialtyGuid: "f30b9e7a-0289-4b99-b08c-82599074eabf",
          specialtyName: "铁路工程",
          specialtyPictureId: "f1cf1b68-c3db-4b70-b03c-5af88420f4a4"
        },
        {
          sort: 0,
          specialtyGuid: "f30b9e7a-0289-4b99-b08c-82599074eabf",
          specialtyName: "铁路工程",
          specialtyPictureId: "f1cf1b68-c3db-4b70-b03c-5af88420f4a4"
        }
      ],
      index: '',
      orgId: '',
      suoshu: [],
      contracting: [{ name: '总包', isActive: false }, { name: '分包', isActive: false }, { name: '联营', isActive: false }],
      pageNumber: 1,
      total: 0,
      erji: [{ "permission": null, "areaName": "洪都拉斯", "specialtyName": "铁路工程", "userName": "马超", "orgName": "中土埃塞俄比亚工程有限公司", "consultingCompanyNationName": null, "applying": null, "consultingNation": null, "nationInfo": null, "bqBill": null, "defaultAttribute": false, "contractBook": null, "contractEndWorkDate": null, "contractMoneyLoc": null, "moneyName": null, "contractMoneyUsd": null, "contractStartWorkDate": null, "contractType": null, "contractDate": null, "endWorkCertificate": null, "performanceTestify": null, "projectContent": null, "projectIntroReport": null, "projectStaff": null, "realityStartWorkDate": null, "realityEndWorkDate": null, "settleAccountsMoneyLoc": null, "settleAccountsMoneyUsd": null, "signAContract": null, "soilStone": null, "updateDate": null, "usdExchangeRate": null, "ownerAddress": null, "ownerEmail": null, "ownerFax": null, "ownerPhone": null, "briefIntroduction": null, "mainJob": null, "constructionConditions": null, "designTask": null, "contractDuration": null, "warrantyPeriod": null, "qualificationPurchaseDate": null, "tenderPurchaseDate": null, "qualificationRequirements": null, "assessedDate": null, "bidDeadlineDate": null, "specialRequirement": null, "tenderMethod": null, "projectScale": null, "paymentCurrencyType": null, "usdPercentage": null, "prepayments": null, "retentionMoney": null, "loan": null, "loanCondition": null, "bidBond": null, "performanceBond": null, "downPaymentDeposit": null, "penaltyForBreachOfContract": null, "taxRegulations": null, "insuranceClaim": null, "entryRestrictions": null, "otherThingsToExplain": null, "competitor": null, "riskDetails": null, "tenderComplianceRiskLevel": null, "businessUnit": null, "ownerUnit": null, "designUnit": null, "supervisionUnit": null, "plannedStartDate": null, "plannedCompletionDate": null, "projectManagerMode": null, "mainEngineeringQuantity": null, "mainProgress": null, "outputValuePlan": null, "outputValueComplete": null, "planningOutline": null, "implementationPlanning": null, "implementationDesign": null, "keyControlEngineering": null, "contactDetails": null, "principal": null, "mainCooperationUnit": null, "remark": null, "projectGuid": "6ae3f7ec-4b73-447a-b7ac-abab1114dcf1", "projectName": "测试", "englishName": "text", "countryId": "02cf02d6-1dc5-4aa5-a3db-62afe75c08bd", "address": "洪都", "jobMode": "2", "sourcesOfFunds": null, "sourcesOfFundsDetail": null, "sourcesOfFundsStr": null, "sourcesOfFundsParent": null, "sourcesOfFundsOther": null, "specialtyGuid": "f30b9e7a-0289-4b99-b08c-82599074eabf", "createTime": 1603505635000, "updateTime": 1603505635000, "status": "4", "projectStage": "0", "projectStatus": null, "qualificationType": "2", "orgId": "163ae1ef-889f-485d-adab-f9151cf4d571", "userId": "30ff2120-c7f1-41bc-a5ca-e9aa506b4038", "contractNumber": "", "consultingCompany": "", "consultingCompanyNation": "", "contractorName": "", "pictureId": "", "projectType": null, "projectArchiveStatus": "0", "bEton": null }]
    }
  },
  methods: {
    major (indexd) {
      this.contracting.map((item, index) => {
        if (indexd === index) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
    },
    pageChange (page) {

    }
  }
}
</script>

<style scoped>
.header {
  height: 40px;
}
.search_input {
  width: 200px;
}
.algin-right {
  text-align: right;
}
.specialtyDiv {
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
.last {
  border-right: 1px solid #dddddd;
}

.org {
  border-top: 1px solid #dddddd;
  height: 40px;
}
.org_left {
  float: left;
  width: 120px;
  height: 40px;
  background-color: #eafcff;
  font-size: 14px;
  line-height: 40px;
  text-indent: 14px;
  border-right: 1px solid #dddddd;
}
.org_right {
  margin-left: 140px;
  line-height: 40px;
}
.liarr-xiangmu {
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
.status {
  border-bottom: 1px solid #ddd;
}

.body {
  border-bottom: 1px solid #cbe8ed;
  margin-top: 50px;
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
</style>

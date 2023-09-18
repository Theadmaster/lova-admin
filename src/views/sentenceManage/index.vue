<template>
  <div class="app-container">
    <el-card class="operation-bar">
      <el-button type="primary" size="mini" @click="dialogVisibleClick('create')"
        >添加语料</el-button
      >
      <!-- <el-button type="warning" size="mini" @click="modefySentence">修改语料</el-button>
            <el-button type="danger" size="mini" @click="deleteSentence">删除语料</el-button> -->
    </el-card>
    <el-table
      v-loading="listLoading"
      :data="list"
      max-height="72vh"
      height="70vh"
      element-loading-text="Loading"
      border
      fit
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      highlight-current-row
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.text }}
        </template>
      </el-table-column>
      <el-table-column label="countdown" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.countdown }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Pageviews" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column> -->
      <el-table-column
        class-name="status-col"
        label="level"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.level | statusFilter">{{
            scope.row.level | levelFilter
          }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="created_at" label="Display_time" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="dialogVisibleClick( 'modify', scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteSentence(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="语料编辑" :visible.sync="dialogVisible" >
      <el-form label-position="left" label-width="100px" :model="formData" >
        <el-form-item label="语料内容">
          <el-col :span="12">
            <el-input v-model="formData.text" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="计时时间">
          <el-col :span="12">
            <el-input-number v-model="formData.countdown" ></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="语料级别" >
          <el-col :span="12">
            <el-select v-model="formData.level" placeholder="请选择活动区域" >
              <el-option label="温和" value=1></el-option>
              <el-option label="热烈" value=2></el-option>
              <el-option label="激情" value=3></el-option>
            </el-select>
          </el-col>
          
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="completeForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <div class="footer">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.count">
      </el-pagination>
    </div>
  </div>
</template>
  
  <script>
import {
  getList,
  addSentence,
  modifySentence,
  deleteSentence,
} from "@/api/sentenceManage";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        2: "gray",
        3: "danger",
      };
      return statusMap[status];
    },
    levelFilter(status) {
      const levelMap = {
        1: "温和",
        2: "热烈",
        3: "激情",
      };
      return levelMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentRow: null,
      formData: {},
      dialogVisible: false,
      operateType: '',
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        count:0
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.pageInfo).then((response) => {
        console.log(response);
        this.list = response.data.data;
        this.pageInfo = response.data.pageInfo
        this.listLoading = false;
      });
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageInfo.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageInfo.pageNum = val
      this.fetchData()
    },
    deleteSentence(id) {
      this.$confirm('此操作将删除该条语料, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSentence({id}).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchData()
          }).catch(err => {
            console.log(err);
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    dialogVisibleClick(type, info) {
      this.dialogVisible = true
      let row = info
      this.operateType = type
      if (type == 'modify') {
        this.currentRow = row.id
        this.formData = row
        console.log(row);
        console.log(this.formData);
      } else if (type === 'create') {
        this.formData = {
          text: '',
          level: 1,
          countdown: 0
        }
      }
    },
    completeForm() {
      let type = this.operateType
      console.log(type);
      this.dialogVisible = false
      console.log(this.formData);
      if (type == 'modify') {
        let form = {
          text: this.formData.text,
          level: parseInt(this.formData.level),
          id: this.formData.id,
          countdown: this.formData.countdown
        }
        modifySentence(form).then(res => {
          this.fetchData()
        }).catch(err => {
          console.log(err);
        })
      } else if (type === 'create') {
        console.log('create');
        let form = {
          text: this.formData.text,
          level: parseInt(this.formData.level),
          countdown: this.formData.countdown
        }
        addSentence(form).then(res => {
          console.log(res);
          this.fetchData()
        }).catch( err => {
          console.log(err);
        })
      } else {
        console.log('提交失败');
      }
    }
  },
};
</script>
 
  <style lang="scss" scoped>
.operation-bar {
  margin-bottom: 20px;
}
.dialog {
  // width: 1000px;
  padding: 0 200px;
}

.footer {
  padding: 30px;
  display: flex;
  justify-content: flex-end;
}

</style>
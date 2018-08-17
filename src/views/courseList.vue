<template>
  <section class="course-container">
    <el-row :gutter="20">
      <el-col :span="6">
          <el-form-item label="课程ID">
              <el-input v-model="formInline" placeholder="审批人"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="课程标题">
              <el-input v-model="formInline" placeholder="审批人"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="课程分类">
              <el-input v-model="formInline" placeholder="审批人"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="上课模式">
              <el-input v-model="formInline" placeholder="审批人"></el-input>
          </el-form-item>
      </el-col>
    </el-row>    
  </section>
</template>
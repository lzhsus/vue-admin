<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.order" placeholder="订单编码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="adminUserinfo">查询</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" v-on:click="updataFunc">更新</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!-- 列表 -->
        <template>
            <div class="title">轮播图</div>
            <div class="banner-box-1">
                <div class="li" v-for="item in users" v-if="item.banner_type==2">
                    <img :src="item.img_url"/>
                        <el-switch  v-model="item.is_on_line"
                         on-color="#00A854" 
                         on-text="启动" 
                         on-value="true" 
                         off-color="#F04134" off-text="禁止" off-value="false"
                            @change="changeSwitch(item)"></el-switch>
                </div>
                <div class="block" >
                    <el-upload
                        action="https://1434253600.xyz/api/upload/uploadfile"
                        ref="upload1"
                        list-type="picture-card"
                        :on-preview="handlePreview"
                        :auto-upload="false"
                        :on-success="uploadSuccess"
                        :file-list="banner"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-button style="margin-left: 10px;" size="small" type="success"  @click="submitUpload1(2)">上传到服务器</el-button>
                </div>
            </div>
            <div class="title">详细信息</div>
            <div class="banner-box-1">
                <div class="li" v-for="item in users" v-if="item.banner_type==1">
                    <img :src="item.img_url"/>
                        <el-switch  v-model="item.is_on_line"
                         on-color="#00A854" 
                         on-text="启动" 
                         on-value="true" 
                         off-color="#F04134" off-text="禁止" off-value="false"
                            @change="changeSwitch(item)"></el-switch>
                </div>
                <div class="block" >
            <el-upload
                action="https://1434253600.xyz/api/upload/uploadfile"
                ref="upload2"
                list-type="picture-card"
                :on-preview="handlePreview"
                :auto-upload="false"
                :on-success="uploadSuccess"
                :file-list="detail"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-button style="margin-left: 10px;" size="small" type="success"  @click="submitUpload2(1)">上传到服务器</el-button>
        </div>
            </div>
        </template>
	</section>
</template>
<script>
    // import { getUserList } from '../../api/api';
    import Api from "../../api/api";

	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
                    name: '',
                    order:''
                },
				total: 0,
				page: 1,
				loading: false,
                users: [],
                banner:[],
                detail:[],
                good_id:'',
                banner_type:''
			}
		},
		methods: {
            adminUserinfo(type=0){
                Api.admin_detail({
					page:this.page,
                    type:type,
                    good_id:this.good_id||this.filters.order
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        console.log(res)
                        res=res.result
                        res.data.map(obj=>{
                            obj.img_url="https://1434253600.xyz/"+obj.img_url
                        })
                        this.users=res.data;
                    }else{

                    }
                })
			},
            uploadSuccess(response, file, fileList){
                console.log("上传文件成功response" ,response);
                console.log("上传文件成功file" ,file);
                console.log("上传文件成功fileList" ,fileList);
                // response：即为后端传来的数据，这里我返回的是图片的路径
                // this.addForm.img_url=response.data[0]
                this.updataFunc(response.data[0])
            },
            updataFunc(img){
                var data={}
                data.img_url=img;
                data.good_id=this.good_id;
                data.banner_type=this.banner_type
                data.type=4
                Api.admin_detail(data).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        this.$message({
							message: '修改成功！',
							type: 'success'
						});
                    }else{

                    }
                })
            },
            changeSwitch(row){
                var is_on_line=0
                console.log(row)
                if(row.is_on_line=="true"){
                    // 关闭
                    is_on_line=true
                    console.log('1---',row.is_on_line)
                }
                if(row.is_on_line=="false"){
                    // 开启
                    is_on_line=false
                    console.log('2---',row.is_on_line)
                }
                Api.admin_detail({
					page:this.page,
					id:row.id,
					is_on_line:is_on_line,
					type:2
                }).then(res=>{
                    res=JSON.parse(res)
                    if(res['success']){
                        this.$message({
							message: '修改成功！',
							type: 'success'
						});
                    }else{
						this.$message.error('修改失败！');
                    }
                })
            },
             submitUpload1(id) {
                 console.log(id)
                 this.banner_type=id
                this.$refs.upload1.submit();
            },
            submitUpload2(id) {
                 console.log(id)
                 this.banner_type=id
                this.$refs.upload2.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
        },
        created(){
          //获取传入的参数
            var param = this.$route.query;
            this.good_id=param.dataObj.id
           
            
            //如果使用query方式传入的参数使用this.$route.query 接收
            //如果使用params方式传入的参数使用this.$router.params接收
        },

		mounted() {
            this.adminUserinfo()
            // 
		}
	};

</script>

<style >
.title{
    width: 100%;
    text-align: left;
    font-size: 30px;color: #000;
    border-bottom: 1px solid #999;
}
.banner-box-1{
    width: 100%;
    display: flex;justify-content: flex-start;align-items: center;
    flex-wrap: wrap;
    padding: 20px 40px;box-sizing: border-box;
    background: rgb(175, 165, 165);
}
.li{
    display: flex;justify-content: center;align-items: center;
    flex-direction: column;
    margin-right: 10px;
    border:4px solid #999;
    padding: 12px;box-sizing: border-box;
}
.li img{
    width: 120px;display: block;
    margin-bottom: 20px;
}
</style>
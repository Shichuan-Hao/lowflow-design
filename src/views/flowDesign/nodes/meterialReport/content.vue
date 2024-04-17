<script setup lang="ts">
import {MeterialReportNode} from './index'
import {inject, Ref, ref, watchEffect} from "vue"
import {getList as getUsers, User} from '~/api/modules/user'
import {getList as getDepts, Dept} from '~/api/modules/dept'
import {getList as getRoles, Role} from '~/api/modules/role'
import {Field} from "~/components/Render/interface"

export interface MeterialReportContentProps {
  node: MeterialReportNode
}

const $props = withDefaults(defineProps<MeterialReportContentProps>(), {})

const content = ref<string>('')

const {fields} = inject<{fields: Ref<Field[]>}>('nodeHooks')!

watchEffect(() => {
  const props = $props.node
  if (props.assigneeType === 'dept') {
    if (props.depts.length > 0) {
      getDepts(props.depts).then(res => {
        if(res.success){
          content.value = res.data.map((item: Dept) => item.name).join('、')
        }
      })
    } else {
      content.value = '未指定部门'
    }
  } else if (props.assigneeType === 'user') {
    if (props.users.length > 0) {
      getUsers(props.users).then(res => {
        if(res.success){
          content.value = res.data.map((item: User) => item.name).join('、')
        }
      })
    } else {
      content.value = '未指定人员'
    }
  } else if (props.assigneeType === 'role') {
    if (props.roles.length > 0) {
      getRoles(props.roles).then(res => {
        if(res.success){
          content.value = res.data.map((item: Role) => item.name).join('、')
        }
      })
    } else {
      content.value = '未指定角色'
    }
  } else {
    content.value = $props.node.name
  }
})

</script>

<template>
  <el-text>
    {{ content || node.name }}
  </el-text>
</template>

<style scoped lang="scss">

</style>

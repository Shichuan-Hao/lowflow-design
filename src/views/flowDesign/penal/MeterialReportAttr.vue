<script setup lang="ts">
import Segmented from '~/components/Segmented'
import {useVModels} from '@vueuse/core'
import {MeterialReportNode} from '../nodes/meterialReport/index'
import {computed, inject, Ref, ref, onMounted} from "vue"
import {CircleCheck, CircleClose, Switch, Plus, Minus} from "@element-plus/icons-vue";
import {Field} from "~/components/Render/interface";
import {FormProperty} from "~/views/flowDesign/index";
import UserSelection from "~/components/UserSelection";
import RoleSelection from "~/components/RoleSelection";

const activeName = ref('properties')

export interface MeterialReportAttr {
  node: MeterialReportNode
}

const $props = defineProps<MeterialReportAttr>()

const $emits = defineEmits<{
  (e: 'update:node', modelValue: MeterialReportNode): void
}>()

const {node} = useVModels($props, $emits)

const {fields} = inject<{
  fields: Ref<Field[]>
}>('nodeHooks')!

// 全部可写
// const allWriteable = computed({
//   get() {
//     return node.value.formProperties.every(e => e.writeable)
//   },
//   set(val) {
//     node.value.formProperties.forEach(e => e.writeable = val)
//     if (val) {
//       allReadable.value = false
//       allHidden.value = false
//     } else {
//       allRequired.value = false
//     }
//   }
// })

// 全部必填
// const allRequired = computed({
//   get() {
//     return node.value.formProperties.every(e => e.required)
//   },
//   set(val) {
//     node.value.formProperties.forEach(e => e.required = val)
//     if (val) {
//       allWriteable.value = true
//       allReadable.value = false
//       allHidden.value = false
//     }
//   }
// })

// 全部可读
// const allReadable = computed({
//   get() {
//     return node.value.formProperties.every(e => e.readable)
//   },
//   set(val) {
//     node.value.formProperties.forEach(e => e.readable = val)
//     if (val) {
//       allWriteable.value = false
//       allHidden.value = false
//       allRequired.value = false
//     }
//   }
// })

// 全部隐藏
// const allHidden = computed({
//   get() {
//     return node.value.formProperties.every(e => e.hidden)
//   },
//   set(val) {
//     node.value.formProperties.forEach(e => e.hidden = val)
//     if (val) {
//       allWriteable.value = false
//       allRequired.value = false
//       allReadable.value = false
//     }
//   }
// })
/**
 * 更改可读
 * @param row
 */
const changeReadable = (row: FormProperty) => {
  if (row.readable) {
    row.writeable = false
    row.required = false
    row.hidden = false
  }
}
/**
 * 更改必填
 * @param row
 */
const changeRequired = (row: FormProperty) => {
  if (row.required) {
    row.writeable = true
    row.readable = false
    row.hidden = false
  }
}
/**
 * 更改可写
 * @param row
 */
const changeWriteable = (row: FormProperty) => {
  if (row.writeable) {
    row.readable = false
    row.hidden = false
  } else {
    row.required = false
  }
}

/**
 * 更改隐藏
 * @param row
 */
const changeHidden = (row: FormProperty) => {
  if (row.hidden) {
    row.readable = false
    row.writeable = false
    row.required = false
  }
}

// onMounted(() => {
//   const formProperties = node.value.formProperties
//   node.value.formProperties = fields.value.filter(e => e.value !== undefined).map(e => ({
//     id: e.id,
//     name: e.title,
//     readable: e.props.disabled || false,
//     writeable: !e.props.disabled || false,
//     hidden: e.props.hidden || false,
//     required: (e.props.required && !e.props.disabled) || false
//   }))
//   node.value.formProperties.forEach(item => {
//     const properties = formProperties.find(f => f.id === item.id)
//     if (properties) {
//       item.readable = properties.readable
//       item.writeable = properties.writeable
//       item.hidden = properties.hidden
//       item.required = properties.required
//     }
//   })
// })
</script>

<template>
  <segmented v-model="activeName" stretch :block="false">
      <el-form label-position="top" label-width="90px">

        <el-form-item prop="assigneeType" label="审批对象">
          <el-radio-group v-model="node.assigneeType">
            <el-radio label="user">指定人员</el-radio>
            <el-radio label="role">指定角色</el-radio>
            <el-radio label="dept">指定部门</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="users" label="指定人员" v-if="node.assigneeType === 'user'">
          <user-selection multiple placeholder="请选择人员" v-model="node.users"/>
        </el-form-item>

        <el-form-item prop="roles" label="指定角色" v-if="node.assigneeType === 'role'">
          <role-selection multiple placeholder="请选择角色" v-model="node.roles"/>
        </el-form-item>

        <el-form-item prop="depts" label="指定部门" v-if="node.assigneeType === 'dept'">
          <role-selection multiple placeholder="请选择部门" v-model="node.depts"/>
        </el-form-item>

        
        <el-form-item prop="method" label="多人审批方式">
          <el-radio-group class="flex-column" v-model="node.multi">
            <el-radio label="sequential">依次审批（按顺序审批）</el-radio>
            <el-radio label="joint">会签（需要所有审批人都通过才可通过）</el-radio>
            <el-radio label="single">或签（其中一名审批人通过或驳回即可）</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
  </segmented>
</template>

<style scoped lang="scss">
.flex-column {
  display: flex !important;
  align-items: flex-start !important;
  flex-direction: column !important;
}

.flow-opt-item {
  display: flex;
  align-items: center;

  .flow-opt-item__icon {
    background: var(--el-color-primary);
    color: #fff;
    border-radius: 7px;
    padding: 3px;
  }

  .flow-opt-item__content {
    box-sizing: border-box;
    flex: 1;
    margin-left: 20px;
    font-size: 14px;

    .flow-opt-item__second {
      margin-top: 3px;
      font-size: 12px;
      color: var(--el-text-color-placeholder);
    }
  }
}
</style>

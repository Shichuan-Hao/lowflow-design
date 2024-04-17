import {FlowNode} from '../Node/index'
import {FormProperty, OperationPermissions} from "~/views/flowDesign/index";

export interface MeterialReportNode extends FlowNode {
    // 审批方式
    assigneeType: 'user' | 'role' | 'dept'
    // 审批人
    users: string[]
    // 审批角色
    roles: string[]
    // 审批部门
    depts: string[]
    // 多人审批方式
    multi: "sequential" | "joint" | "single"
}
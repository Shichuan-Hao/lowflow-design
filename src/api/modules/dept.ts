import http from '~/api/index'

export interface Dept {
    id: string,
    name: string
}

/**
 * 获取部门信息
 * @param id
 */
export const getById = (id: string) => {
    return http.get<Dept>(`/dept/info`,{id:id})
}

/**
 * 查询部门列表
 */
export const getList = (deptIds?: string[]) => {
    const params = deptIds ? {deptIds: deptIds} : {}
    return http.post<Dept[]>('/dept/list', params)
}

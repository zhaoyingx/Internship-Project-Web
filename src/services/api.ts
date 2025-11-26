const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  params?: Record<string, unknown>
  data?: Record<string, unknown>
  headers?: Record<string, string>
  timeout?: number
}

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/**
 * 通用 API 请求方法
 * @param path - 接口路径 (例如: '/api/chart/data')
 * @param options - 请求配置选项
 * @returns 返回响应数据
 */
export async function fetchData<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', params = {}, data, headers = {}, timeout = 30000 } = options

  // 构建 URL
  let url = `${API_BASE_URL}${path}`

  // 处理 GET 请求的查询参数
  if (method === 'GET' && Object.keys(params).length > 0) {
    const queryParams: Record<string, string> = {}
    Object.entries(params).forEach(([key, value]) => {
      queryParams[key] = String(value)
    })
    const queryString = new URLSearchParams(queryParams).toString()
    url += `?${queryString}`
  }

  // 构建请求配置
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  // 非 GET 请求添加请求体
  if (method !== 'GET' && data) {
    fetchOptions.body = JSON.stringify(data)
  }

  // 设置请求超时
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  fetchOptions.signal = controller.signal

  try {
    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    // 打印返回数据用于调试
    console.log('API Response:', result)

    // 如果返回的是标准格式 { code, message, data }
    if (result && typeof result === 'object' && 'code' in result) {
      if (result.code !== 0 && result.code !== 200) {
        throw new Error(result.message || 'Unknown error')
      }
      return result.data as T
    }

    // 如果直接返回数据，没有包装
    return result as T
  } catch (error) {
    clearTimeout(timeoutId)
    console.error('API request failed:', error)
    throw error
  }
}

/**
 * GET 请求简便方法
 */
export function get<T = unknown>(path: string, params?: Record<string, unknown>): Promise<T> {
  return fetchData<T>(path, { method: 'GET', params })
}

/**
 * POST 请求简便方法
 */
export function post<T = unknown>(
  path: string,
  data?: Record<string, unknown>,
  params?: Record<string, unknown>,
): Promise<T> {
  return fetchData<T>(path, { method: 'POST', data, params })
}

/**
 * PUT 请求简便方法
 */
export function put<T = unknown>(
  path: string,
  data?: Record<string, unknown>,
  params?: Record<string, unknown>,
): Promise<T> {
  return fetchData<T>(path, { method: 'PUT', data, params })
}

/**
 * DELETE 请求简便方法
 */
export function del<T = unknown>(path: string, params?: Record<string, unknown>): Promise<T> {
  return fetchData<T>(path, { method: 'DELETE', params })
}

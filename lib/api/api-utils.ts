export class ApiUtils {
  static put<T>(url: string, body: T): Promise<T> {
    return ApiUtils.apiCall<T>(url, body, 'PUT');
  }

  static post<T>(url: string, body: T): Promise<T> {
    return ApiUtils.apiCall<T>(url, body, 'POST');
  }

  private static apiCall<T>(url: string, body: T, method: string): Promise<T> {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => {
      if (res.status < 400) {
        return res.json();
      }
      return Promise.reject(res.json());
    });
  }

}

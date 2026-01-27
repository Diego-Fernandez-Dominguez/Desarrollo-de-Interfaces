export class APIConnection {
  private static instance: APIConnection;
  baseURL  = 'https://dferdom-bwccctb4hxcngufd.francecentral-01.azurewebsites.net/';

  private constructor() {}

  public static getInstance(): APIConnection {
    if (!APIConnection.instance) {
      APIConnection.instance = new APIConnection();
    }
    return APIConnection.instance;
  }

  public async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en GET:', error);
      throw error;
    }
  }

  public async post<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en POST: ${errorText}`);
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      return await response.json();
    }

    return {} as T;
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
}



  public async put<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en PUT: ${errorText}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      return await response.json();
    } else {
      return {} as T;
    }
  } catch (error) {
    console.error('Error en PUT:', error);
    throw error;
  }
}


  public async delete(endpoint: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error en DELETE:', error);
      throw error;
    }
  }
}
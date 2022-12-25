export default function ({ $axios, redirect, socket }) {
    $axios.onResponse(response => {
      // console.log('Axios response', response.data)
      const route = response.config.url.split(response.config.baseURL).pop();
      if(route == '/auth/user') {
        console.log(socket)
      }
    })
}
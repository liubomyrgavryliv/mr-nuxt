export default ({ $axios, env }) => {
    $axios.onRequest((config) => {
        // Adds header: `Content-Type: application/x-www-form-urlencoded` to only get requests
        $axios.setHeader('Content-Type', 'application/json', ['get'])
    })
}

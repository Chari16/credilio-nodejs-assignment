# credilio-nodejs-assignment
Web crawler assignment for crawling imdb movies data.

### Server:-

### Folder Structure
 - `config` ( All config files with environment variables)
 - `controllers` ( Business logic layer )
 - `routes` ( Api routes )
 
### BASE_URL 
localhost:5000/api/v1/

### System conisits of following API's
1. `GET /movies`: This api is used to get all movies.

2. `GET /movies/crawl`: This api is used to start crawling imdb website page.

3. `GET /movies/search`: This api is used to search movies through movies.json file. This API find movies using on three attributes title, description and genre.

    Query Params:
        
        For search: ?q=Father


### Client:-

### URL
localhost:3000

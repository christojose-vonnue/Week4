console.log("sw loaded");

// D1 : This has something to do with cache.. may be idf stored in cache, we can work without internet

const cachename="SWcache8"
const assests=["5service.html","main.js","icon-192.png","icon-512.png","6mainfest.json"]

self.addEventListener('install',(e)=>{
    console.log("1. Only fired once");
    console.log(e);

    e.waitUntil(
        // console.log("2. The cache API fired once");
        // console.log(e);

        caches.open(cachename).then((cache)=>{
            // console.log("2. The cache API fired once");
            // console.log(e);
            console.log("3. SW precacing assests");
            console.log(cache);
            console.log("instal event is over..........");
            return cache.addAll(assests) // D2 : Why are we returning, who is receiving.. what is happening
            
        })
    )
})

//// Adding a new event 'activate'

self.addEventListener('activate',(e)=>{
    console.log('fired only once');
    e.waitUntil(

        caches.keys().then((keys)=>{
            console.log("What is caches...");
            console.log(caches);
            console.log("What are keys..");
            console.log(keys);
            // We have to return... ro e.ewaituntil
            return Promise.all(
                keys.map((key)=>{
                    if(key!=cachename){
                        console.log("we delete this key as this is not our cache");   
                        console.log(key);
                        caches.delete(key)
                    }
                })
            )
        }).then(()=>{
                    return self.clients.claim()
            })
    )
    
})

/// ADDING A NEW EVENT CALLED fetch, we first intalled, activated, and now we are fetching the resources

self.addEventListener('fetch',(e)=>{
    e.respondWith(
        
        caches.match(e.request).then((response)=>{
            console.log(e.request);
            if(response){

                console.log("Cache Hit!!");
                console.log(response);
                console.log("serving from.. ",e.request.url);
                
                return response
            }
           
            console.log("N/A in cache");
            console.log("So we are fetching it..");
            console.log("fetching from internet ",e.request.url);
            return fetch(e.request).catch((err) => {
                console.error("Network request failed and item not in cache:", err);
                // Optional: Return a fallback offline HTML page or static response
            });
        })
    )
})

//
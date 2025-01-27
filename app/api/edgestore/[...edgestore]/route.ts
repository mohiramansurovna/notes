// import {initEdgeStore} from '@edgestore/server';
// import {createEdgeStoreNextHandler} from '@edgestore/server/adapters/next/app';
// const es=initEdgeStore.create()

// const edgeStoreRouter=es.router({
//     profileImages:es.imageBucket()
// });

// const handler=createEdgeStoreNextHandler({
//     router:edgeStoreRouter
// })

// export {handler as GET, handler as POST,handler as DELETE}

// export type EdgeStoreRouter=typeof edgeStoreRouter;
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
 
const es = initEdgeStore.create();
 
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  profileImages: es.imageBucket(),
});
 
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});
 
export { handler as GET, handler as POST };
 

export type EdgeStoreRouter = typeof edgeStoreRouter;
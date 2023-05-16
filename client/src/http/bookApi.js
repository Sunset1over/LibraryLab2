    import {$authHost, $host} from "./index";

    export const createType = async (type) => {
        const {data} = await $authHost.post('api/type/create', type)
        return data
    }

    export const fetchType = async (id) => {
        const {data} = await $host.get(`api/type/get_one/${id}`)
        return data
    }

    export const fetchTypes = async () => {
        const {data} = await $host.get('api/type/get_all')
        return data
    }

    export const updateType = async (id, name) => {
        const { data } = await $authHost.patch(`api/type/update/${id}`, { name });
        return data;
    };

    export const deleteType = async (id) => {
        const { data } = await $authHost.delete(`api/type/delete/${id}`);
        return data;
    };

    export const createPublisher = async (publisher) => {
        const {data} = await $authHost.post('api/publisher/create', publisher)
        return data
    }

    export const fetchPublisher = async (id) => {
        const {data} = await $host.get(`api/publisher/get_one/${id}`)
        return data
    }

    export const fetchPublishers = async () => {
        const {data} = await $host.get('api/publisher/get_all')
        return data
    }

    export const updatePublisher = async (id, name) => {
        const { data } = await $authHost.patch(`api/publisher/update/${id}`, { name });
        return data;
    };

    export const deletePublisher = async (id) => {
        const { data } = await $authHost.delete(`api/publisher/delete/${id}`);
        return data;
    };

    export const createBook = async (book) => {
        const {data} = await $authHost.post('api/book/create', book)
        return data
    }

    export const fetchBooks = async (typeId, publisherId, page, limit= 5) => {
        const {data} = await $host.get('api/book/get_all', {params: {
                typeId, publisherId, page, limit
            }})
        return data
    }

    export const fetchOneBook = async (id) => {
        const {data} = await $host.get('api/book/' + id)
        return data
    }

    export const updateBook = async (id, name, language, origin_language, cover, pages, translator, year_of_publishing, rating, typeId, publisherId, img) => {
        const { data } = await $authHost.patch(`api/book/update/${id}`, { name, language, origin_language, cover, pages, translator, year_of_publishing, rating, typeId, publisherId, img });
        return data;
    };

    export const deleteBook = async (id) => {
        const { data } = await $authHost.delete(`api/book/delete/${id}`);
        return data;
    };
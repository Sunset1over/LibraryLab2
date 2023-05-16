import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._types = []
        this._publishers = []
        this._books = []
        this._selectedType = {}
        this._selectedPublisher = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 4
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setPublishers(publishers) {
        this._publishers = publishers
    }
    setBooks(books) {
        this._books = books
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedPublisher(publisher) {
        this._selectedPublisher = publisher
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get publishers() {
        return this._publishers
    }
    get books() {
        return this._books
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedPublisher() {
        return this._selectedPublisher
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
/**
 * @class paginator
 */
export class paginator {

    readonly data: Object[];
    readonly total: number;
    readonly current_page: number;
    readonly request_path: string;
    readonly per_page: number;
    readonly from: number;
    readonly to: number;
    readonly last_page: number;
    readonly next_page_url: string = '';
    readonly prev_page_url: string = '';
    readonly last_page_url: string = '';

    /**
     *
     * @param data
     * @param total
     * @param current_page
     * @param per_page
     * @param request_path
     */
    constructor(
        data: Object[],
        total: number,
        current_page: number,
        per_page: number,
        request_path: string
    ) {
        this.data = data;
        this.total = total;
        this.current_page = current_page;
        this.request_path = request_path;
        this.per_page = per_page;
        this.from = this.getFrom();
        this.to = this.getTo();
        this.last_page = this.getLastPage();
        this.next_page_url = this.getNextPageUrl();
        this.prev_page_url = this.getPrevPageUrl();
        this.last_page_url = this.getLastPageUrl();
    }

    /**
     * @return number
     */
    private getFrom() {
        return ((this.per_page) * (this.current_page - 1) + 1);
    }

    /**
     * @return number
     */
    private getTo() {
        // return (this.per_page) * (this.current_page);
        return this.from + this.data.length - 1;
    }

    /**
     * @return number
     */
    private getLastPage() {
        return Math.ceil(this.total / this.per_page);
    }

    /**
     * @return string
     */
    private getNextPageUrl() {

        if (this.current_page >= this.last_page) {
            return '';
        } else {
            return this.request_path + '?page=' + (this.current_page + 1); // todo
        }
    }

    /**
     * @return string
     */
    private getPrevPageUrl() {

        if (this.current_page == 1 || this.last_page < this.current_page - 1) {
            return '';
        } else {
            return this.request_path + '?page=' + (this.current_page - 1);
        }
    }

    /**
     * @return string
     */
    private getLastPageUrl() {
        return this.request_path + '?page=' + this.last_page;
    }


    /**
     * returns an object for pagination response
     */
    public resolve() {
        return {
            data: this.data,
            from: this.from,
            to: this.to,
            total: this.total,
            current_page: this.current_page,
            last_page: this.last_page,
            per_page: this.per_page,
            next_page_url: this.next_page_url,
            prev_page_url: this.prev_page_url,
            last_page_url: this.last_page_url,
        };
    }

    /**
     * @param page
     * @return number
     */
    public static filterPage(page: string) {
        if (typeof page == "undefined" || page == '0') {
            return 1;
        }
        let p = parseInt(page);

        if (p < 0) {
            p = 1;
        }

        return p;
    }

    /**
     * @param perPage
     * @return number
     */
    public static filterPerPage(perPage: string) {
        if (typeof perPage == "undefined" || perPage == '0') {
            return 10;
        }
        let p = parseInt(perPage);

        if (p < 0 || p > 50) {
            p = 10;
        }

        return p;
    }
}

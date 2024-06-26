
class Karma {
    private apiKey: string
    private baseUrl: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
        this.baseUrl = 'https://adjutor.lendsqr.com/v2'
    }

    async isOnBlacklist(email: string) {
        const url = `${this.baseUrl}/verification/karma/${email}`
        const resp = await fetch(url, { headers: { 'Authorization': `Bearer ${this.apiKey}` } })

        const data = await resp.json()
        const user = data.data

        if (!user) return false

        return true
    }
}

export default new Karma(process.env.ADJUTOR_SECRET_KEY!!)
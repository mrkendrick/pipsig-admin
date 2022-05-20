import moment from 'moment'
import Cookies from 'universal-cookie'

class Helper {
  constructor(readonly storageKey: string, readonly refCodeKey: string) {}

  session(options: { method: 'get' | 'set' | 'del'; value?: string }) {
    switch (options.method) {
      case 'get':
        return sessionStorage.getItem(this.storageKey)

      case 'set':
        options.value && sessionStorage.setItem(this.storageKey, options.value)
        break

      case 'del':
        sessionStorage.removeItem(this.storageKey)
        break

      default:
        break
    }
  }

  storage(options: { method: 'get' | 'set' | 'del'; value?: string }) {
    switch (options.method) {
      case 'get':
        return localStorage.getItem(this.refCodeKey)

      case 'set':
        options.value && sessionStorage.setItem(this.refCodeKey, options.value)
        break

      case 'del':
        sessionStorage.removeItem(this.refCodeKey)
        break

      default:
        break
    }
  }

  cookies(options: { method: 'get' | 'set' | 'del'; value?: string }) {
    const cookies = new Cookies()

    switch (options.method) {
      case 'get':
        return cookies.get(this.storageKey, {})

      case 'set':
        options.value &&
          cookies.set(this.storageKey, options.value, { path: '/' })
        break

      case 'del':
        cookies.remove(this.storageKey, { path: '/' })
        break

      default:
        break
    }
  }

  dateFromNow(date: string) {
    return moment(date).fromNow()
  }

  formatDate(date: any, type: string) {
    return moment(date).format(type)
  }

  async copyToClipboard(value: string) {
    await navigator.clipboard.writeText(value.toString())
  }
}

const HelperServices = new Helper('pipsignal_admin_token', 'pipsignalRefCode')
export default HelperServices

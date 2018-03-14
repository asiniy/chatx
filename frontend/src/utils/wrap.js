import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    push,
  }, dispatch)
})

const defaultMapStateToProps = () => ({})

export default (mapStateToProps = defaultMapStateToProps) => (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

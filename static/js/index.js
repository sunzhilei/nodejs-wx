import 'jquery';
import 'bootstrap';

class IndexDefault extends React.Component {
	render() {
		return (
			<div>
				<button type="button" className="btn btn-default" data-toggle="modal" data-target="#myModal">Default</button>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Primary</button>
				<button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal">Success</button>
				<button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Info</button>
				<button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal">Warning</button>
				<button type="button" className="btn btn-danger" data-toggle="modal" data-target="#myModal">Danger</button>
				<button type="button" className="btn btn-link" data-toggle="modal" data-target="#myModal">Link</button>

				<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
								<h4 className="modal-title" id="myModalLabel">Modal title</h4>
							</div>
							<div className="modal-body">
								...
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary">Save changes</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
}

ReactDOM.render(<IndexDefault/>, document.getElementById('body'));
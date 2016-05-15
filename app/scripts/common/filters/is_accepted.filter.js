angular.module('vinciApp')
    .filter('isAccepted', () => {
        var result = (id) => {
            let index = parseInt(id);
            switch (index) {
                case 1:
                    return '接受';
                case 0:
                    return '不接受';
            }
        }
        return result;
    });

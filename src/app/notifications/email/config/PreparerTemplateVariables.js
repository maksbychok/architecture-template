const {
  footerCopyright,
  footerCompanyInfo,
  headerMastheadName,
  headerLinkMastheadName,
} = require('@notifications/email/config/templateVariables');

class PreparerTemplateVariables {
  
  prepareVariables() {
    return {
      ...(typeof headerMastheadName !== 'undefined' && { headerMastheadName }),
      ...(typeof headerLinkMastheadName !== 'undefined' && { headerLinkMastheadName }),
      ...(typeof footerCopyright !== 'undefined' && { footerCopyright }),
      ...(typeof footerCompanyInfo !== 'undefined' && { footerCompanyInfo }),
    };
  }
}

module.exports = PreparerTemplateVariables;
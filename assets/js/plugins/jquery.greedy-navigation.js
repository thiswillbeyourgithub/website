/*
 * Masthead navigation (no hamburger)
 *
 * The upstream "greedy navigation" moved overflowing links into a hamburger
 * menu. Here every link always stays visible: .visible-links uses flex-wrap,
 * so on narrow screens the items simply flow onto as many rows as needed.
 *
 * The masthead is position: fixed, so the only job left is to keep the body
 * (and sidebar) top padding equal to the masthead height, which changes with
 * the number of rows (viewport width, web font loading, orientation...).
 */

var $masthead = $('.masthead');

function updateMastheadOffset() {
  var mastheadHeight = $masthead.outerHeight();
  $('body').css('padding-top', mastheadHeight + 'px');
  if ($(".author__urls-wrapper button").is(":visible")) {
    $(".sidebar").css("padding-top", "");
  } else {
    $(".sidebar").css("padding-top", mastheadHeight + "px");
  }
}

// ResizeObserver catches every height change of the masthead (row count,
// late font loading), not only window resizes.
if ($masthead.length && 'ResizeObserver' in window) {
  new ResizeObserver(updateMastheadOffset).observe($masthead[0]);
}
$(window).on('resize', updateMastheadOffset);
updateMastheadOffset();
